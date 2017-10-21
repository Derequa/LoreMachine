import { SettingsSchema } from './SettingsManager';
import { Lore } from '../model/Lore';
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

let instance = null;

export default class RealmManager {

    static async getRealm() {
        return new Promise(async function (resolve, reject) {
            if (!instance) {
                let schemas = new Array();
                schemas.concat(Lore);
                schemas.push(SettingsSchema);
                instance = await Realm.open({schema: schemas});
            }
            resolve(instance);
        });
    }
}