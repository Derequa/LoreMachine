import { SettingsSchema } from './SettingsManager';
import { Lore, searchable_schemas} from '../model/Lore';
import { initData } from '../model/Loader';
import Fuse from 'fuse.js';
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

var options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys:
    [
        "name",
    ]
};
  

export const intObject = {
    name: 'intObject',
    properties: { val: 'int' }
}

export const stringObject = {
    name: 'stringObject',
    properties: { val: 'string' }
}

export const tableObject = {
    name: 'tableObject',
    properties: {
        name: 'string',
        columns: {type: 'list', objectType: 'stringObject'},
        rows: {type: 'list', objectType: 'stringObject'},
    }
}

let instance = null;

export default class RealmManager {

    static async getRealm() {
        if (!instance) {
            return new Promise(async function (resolve, reject) {
                let schemas = new Array();
                schemas.push(SettingsSchema, intObject, stringObject, tableObject);
                schemas = schemas.concat(Lore);
                //await debugOpen(schemas);
                instance = await Realm.open({schema: schemas});
                console.log('initializing data...');
                await initData(instance);
                resolve(instance);
            });
        }
        return instance;
    }
}

export async function searchAll(query, resultsLimit) {
    // Results are a map of object types to lists of objects
    let results = [];
    let result_counter = 0;

    if (!instance)
        await RealmManager.getRealm();
    
    for (let i = 0 ; (i < searchable_schemas.length) ; i++) {
        console.log(`searching ${searchable_schemas[i].object_name}...`);
        
        if (!searchable_schemas[i].object_name || !searchable_schemas[i].type_display_name || !searchable_schemas[i].filter)
            continue;
        
        console.log(searchable_schemas[i].filter.replace('<value>', query));
        let currentResults = await instance
            .objects(searchable_schemas[i].object_name)
            .filtered(searchable_schemas[i].filter.replace('<value>', query));
        
        let num_results = Object.keys(currentResults).length;
        if (num_results === 0)
            continue;

        for (let j = 0 ; j < num_results ; j++) {
            const formattedResult =
            {
                id: currentResults[j].id,
                name: currentResults[j].name,
                description: currentResults[j].description,
                url: currentResults[j].url,
                type: searchable_schemas[i].type_display_name,
                object_name: searchable_schemas[i].object_name,
            }
            results.push(formattedResult);
        }
    }
    let fuse = new Fuse(results, options); // order by relavence
    results = fuse.search(query);
    return results;
}

function getResultsArray(results, limit, query) {
    let lim = (limit === undefined ? results.length : limit);
    let table_results = [];

    for (let i = 0 ; i < lim ; i++) {
        table_results.push(results[i]);
    }

    let fuse = new Fuse(table_results, options); // order by relavence
    let sorted = fuse.search(query);
    return sorted;
}

async function debugOpen(schemas) {
    for (let i = 0 ; i < schemas.length ; i++) {
        console.log('Opening: ' + schemas[i].name);
        let temp = await Realm.open({schema: [schemas[i], intObject, stringObject]});
        await temp.close();
    }
}

export async function getAllFrom(object_name) {
    const realm = await RealmManager.getRealm();
    const results = await realm.objects(object_name);

    const num_results = Object.keys(results).length;
    if (num_results === 0)
        return [];

    let type;
    for (let i = 0 ; i < searchable_schemas.length ; i++) {
        if (searchable_schemas[i].object_name === object_name)
            type = searchable_schemas[i].type_display_name;
    }
    
    let ret = [];
    for (let i = 0 ; i < num_results ; i++) {
        const formattedResult =
        {
            id: results[i].id,
            name: results[i].name,
            description: results[i].description,
            url: results[i].url,
            type: type,
            object_name: object_name,
            raw: Object.assign({}, results[i])
        }
        ret.push(formattedResult);
    }

    return ret;
}