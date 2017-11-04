import { language_data } from '../../assets/data/pathfinder_rpg/core_rulebook/Languages';
import { spells_data } from '../../assets/data/pathfinder_rpg/core_rulebook/Spells';
import { spell_school_power_data } from '../../assets/data/pathfinder_rpg/core_rulebook/SpellSchoolPowers';
import { spell_school_data } from '../../assets/data/pathfinder_rpg/core_rulebook/SpellSchools';
import { searchable_schemas } from './Lore';

const data_map = {
    'Language': language_data,
    'SkillInfo': null,
    'BaseWeapon': null,
    'BaseArmor': null,
    'SpellSchoolPower': spell_school_power_data,
    'SpellSchool': spell_school_data,
    'Spell': spells_data,
    'Item': null,
    'Feat': null,
    'ClericPower': null,
    'ClericDomain': null,
    'BloodlinePower': null,
    'SorcererBloodline': null,
    'ClassFeature': null,
    'Character': null,
}

export async function initData(realm) {
    let needs_init = await getInitMap(realm);
    console.log('Items that need initialization: ' + needs_init.length);
    await realm.write(async () => {
        for (let i = 0 ; i < needs_init.length ; i++) {
            console.log(needs_init[i].name);
            switch (needs_init[i].name) {
                case 'Language':
                try {
                    for (let j = 0 ; j < language_data.length ; j++) {
                        console.log('Creating Language : { name: ' + JSON.stringify(language_data[j].name) + ', id: ' + JSON.stringify(language_data[j].id) + ' }');
                        realm.create('Language',
                        {
                            id: language_data[j].id,
                            name: language_data[j].name,
                            description: language_data[j].description,
                            url: language_data[j].url
                        });
                    }
                } catch (err) { console.error(err); }
                break;
                
                case 'SkillInfo':
                break;
                case 'BaseWeapon':
                break;
                case 'BaseArmor':
                break;
                case 'SpellSchoolPower':
                break;
                case 'SpellSchool':
                break;
                case 'Spell':
                break;
                case 'Item':
                break;
                case 'Feat':
                break;
                case 'ClericPower':
                break;
                case 'ClericDomain':
                break;
                case 'BloodlinePower':
                break;
                case 'SorcererBloodline':
                break;
                case 'ClassFeature':
                break;
                case 'Character':
                break;
                default:
                break;
            }
        }
    });
}

async function getInitMap(realm) {
    let ret = [];
    for (let i = 0 ; i < searchable_schemas.length ; i++) {
        if (data_map[searchable_schemas[i].object_name] !== null) {
            console.log(searchable_schemas[i].object_name + ' has data!');
            let need = await needsInit(realm, searchable_schemas[i].object_name, data_map[searchable_schemas[i].object_name].length);
            console.log(searchable_schemas[i].object_name + ' needs init? ' + need);
            if (need) {
                ret.push({ name: searchable_schemas[i].object_name, data: data_map[searchable_schemas[i].object_name]});
            }
        }
    }
    return ret;        
}

async function needsInit(realm, table_name, target_num) {

    let objs = await realm.objects(table_name);
    console.log(table_name + ' current size: ' + objs.length + ', loaded size: ' + target_num)
    return objs.length < target_num
}