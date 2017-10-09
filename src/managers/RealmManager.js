import { SettingsSchema } from './SettingsManager';

let instance = null;

export default class RealmManager {

    constructor() {
        if (!instance) {
            instance = this;
            // Setup new realm wrapper
            this.realm = new Realm({schema: [SettingsSchema]});
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