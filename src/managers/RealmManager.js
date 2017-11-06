import { SettingsSchema } from './SettingsManager';
import { Lore, searchable_schemas} from '../model/Lore';
import { initData } from '../model/Loader';

const Realm = require('realm');
var Promise = require('bluebird');

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});

export const intObject = {
    name: 'intObject',
    properties: { val: 'int' }
}

export const stringObject = {
    name: 'stringObject',
    properties: { val: 'string' }
}

let instance = null;

export default class RealmManager {

    static async getRealm() {
        return new Promise(async function (resolve, reject) {
            if (!instance) {
                let schemas = new Array();
                schemas.push(SettingsSchema, intObject, stringObject);
                schemas = schemas.concat(Lore);
                //await debugOpen(schemas);
                instance = await Realm.open({schema: schemas});
                console.log('initializing data...');
                await initData(instance);
            }
            resolve(instance);
        });
    }
}

export async function searchAll(query, resultsLimit) {
    // Results are a map of object types to lists of objects
    let results = [];
    let result_counter = 0;

    if (!instance)
        await RealmManager.getRealm();
    for (let i = 0 ; (i < searchable_schemas.length) ; i++) {
        console.log('searching ' + searchable_schemas[i].object_name + '...');
        console.log(JSON.stringify(searchable_schemas[i]));
        if (!searchable_schemas[i].object_name || !searchable_schemas[i].display_name || !searchable_schemas[i].filter)
            continue;
        
        console.log(searchable_schemas[i].filter.replace('<value>', query));
        let currentResults = await instance
            .objects(searchable_schemas[i].object_name)
            .filtered(searchable_schemas[i].filter.replace('<value>', query));
        
        console.log(currentResults);
        
        let num_results = Object.keys(currentResults).length;
        if (num_results === 0)
            continue;
        if (resultsLimit && (num_results > (resultsLimit - result_counter))) {
            results.push({
                table: searchable_schemas[i].display_name,
                display_name: searchable_schemas[i].display_name,
                data: getResultsArray(currentResults, (resultsLimit - result_counter)),
            });
            return results;
        }
        else {
            results.push({
                table: searchable_schemas[i].display_name,
                display_name: searchable_schemas[i].display_name,
                data: getResultsArray(currentResults, num_results),
            });
        }
        console.log(results);
    }

    return results;
}

function getResultsArray(results, limit) {
    let lim = (limit === undefined ? results.length : limit);
    let table_results = [];

    for (let i = 0 ; i < lim ; i++) {
        table_results.push(results[i]);
    }

    return table_results;
}

async function debugOpen(schemas) {
    for (let i = 0 ; i < schemas.length ; i++) {
        console.log('Opening: ' + schemas[i].name);
        let temp = await Realm.open({schema: [schemas[i], intObject, stringObject]});
        await temp.close();
    }
}