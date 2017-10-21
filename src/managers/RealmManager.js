import { SettingsSchema } from './SettingsManager';
import { Lore } from '../model/Lore';

let instance = null;

export default class RealmManager {

    constructor() {
        if (!instance) {
            instance = this;
            // Setup new realm wrapper
            let schemas = new Array();
            schemas.concat(Lore);
            schemas.push(SettingsSchema);
            this.realm = new Realm({schema: schemas});
        }

        return instance;
    }

    static getRealm() {
        if (instance) {
            return instance.realm;
        }
        else {
            let temp = new RealmManager();
            return temp.realm;
        }
    }
}