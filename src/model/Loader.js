import { language_data } from '../../assets/data/pathfinder_rpg/core_rulebook/Languages';
import { spells_core_rulebook_data } from '../../assets/data/pathfinder_rpg/core_rulebook/SpellsCoreRulebook';
import { spell_school_power_data } from '../../assets/data/pathfinder_rpg/core_rulebook/SpellSchoolPowers';
import { spell_school_data } from '../../assets/data/pathfinder_rpg/core_rulebook/SpellSchools';
import { skill_data } from '../../assets/data/pathfinder_rpg/core_rulebook/Skills';
import { searchable_schemas } from './Lore';

const data_map = {
    'Language': language_data,
    'SkillInfo': skill_data,
    'BaseWeapon': null,
    'BaseArmor': null,
    'SpellSchoolPower': spell_school_power_data,
    'SpellSchool': spell_school_data,
    'Spell': spells_core_rulebook_data,
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
                console.log('initializing languages');
                try {
                    for (let j = 0 ; j < language_data.length ; j++) {
                        logWrite('Language', language_data[j].name, language_data[j].id);
                        realm.create('Language',
                        {
                            id: language_data[j].id,
                            name: language_data[j].name,
                            description: language_data[j].description,
                            url: language_data[j].url
                        }, true);
                    }
                } catch (err) { console.error(err); }
                break;
                
                case 'SkillInfo':
                console.log('initializing skills');
                try {
                    for (let j = 0 ; j < skill_data.length ; j++) {
                        logWrite('SkillInfo', skill_data[j].name, skill_data[j].id);
                        realm.create('SkillInfo',
                        {
                            id: skill_data[j].id,
                            name: skill_data[j].name,
                            description: skill_data[j].description,
                            ability_type: skill_data[j].ability_type,
                            url: skill_data[j].url,
                        }, true);
                    }
                } catch (err) { console.error(err) }
                break;

                case 'BaseWeapon':
                break;

                case 'BaseArmor':
                break;

                case 'SpellSchoolPower':
                console.log('initializing spellschoolpowers');
                try {
                    for (let j = 0 ; j < spell_school_power_data.length ; j++) {
                        logWrite('SpellSchoolPower', spell_school_power_data[j].name, spell_school_power_data[j].id);
                        realm.create('SpellSchoolPower',
                        {
                            id: spell_school_power_data[j].id,
                            name: spell_school_power_data[j].name,
                            description: spell_school_power_data[j].description,
                            parent_id: spell_school_power_data[j].parent_id
                        }, true);
                    }
                } catch (err) { console.error(err); }
                break;

                case 'SpellSchool':
                console.log('initializing spellschools');
                try {
                    for (let j = 0 ; j < spell_school_data.length ; j++) {
                        logWrite('SpellSchool', spell_school_data[j].name, spell_school_data[j].id);
                        /*let powers = [];
                        for (let k = 0 ; k < spell_school_data[j].powers.length ; k++) {
                            powers.push({ val: spell_school_data[j].powers[k] });
                        }*/
                        realm.create('SpellSchool',
                        {
                            id: spell_school_data[j].id,
                            name: spell_school_data[j].name,
                            description: spell_school_data[j].description,
                            url: spell_school_data[j].url,
                            powers: spell_school_data[j].powers
                        }, true);
                    }
                } catch (err) { console.error(err); }
                break;

                case 'Spell':
                console.log('initializing spells');
                try {
                    for (let j = 0 ; j < spells_core_rulebook_data.length ; j++) {
                        logWrite('Spell', spells_core_rulebook_data[j].name, spells_core_rulebook_data[j].id);
                        /*
                        let classLevels = [];
                        for (let k = 0 ; k < spells_core_rulebook_data[j].level.length ; k++) {
                            classLevels.push({
                                clazz: spells_core_rulebook_data[j].level[k].clazz,
                                level: spells_core_rulebook_data[j].level[k].level
                            });
                        }*/

                        realm.create('Spell',
                        {
                            id: spells_core_rulebook_data[j].id,
                            name: spells_core_rulebook_data[j].name,
                            level: spells_core_rulebook_data[j].level,
                            school: spells_core_rulebook_data[j].school,
                            type: spells_core_rulebook_data[j].type,
                            casting_time: spells_core_rulebook_data[j].casting_time,
                            components: spells_core_rulebook_data[j].components,
                            range: spells_core_rulebook_data[j].range,
                            effect: spells_core_rulebook_data[j].effect,
                            duration: spells_core_rulebook_data[j].duration,
                            saving_throw: spells_core_rulebook_data[j].saving_throw,
                            spell_resistance: spells_core_rulebook_data[j].spell_resistance,
                            description: spells_core_rulebook_data[j].description,
                            url: spells_core_rulebook_data[j].url,
                        }, true);
                    }
                } catch (err) { console.error(err) }
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

function logWrite(type, name, id) {
    console.log(`Creating ${type} : { name: ${name}, id: ${id} }`);
}