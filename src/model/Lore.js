export const AbilitySchema = {
    name: 'Ability',
    properties: {
        name: 'string', // 3 letter code
        score: 'int',
        temp_adjust: 'int',
        temp_modifier: 'int',
    }
}

export const SavingThrowSchema = {
    name: 'SavingThrow',
    properties: {
        name: 'string',
        base_save: 'int',
        magic_modifier: 'int',
        misc_modifier: 'int',
        temp_modifier: 'int',
    }
}

export const LanguageSchema = {
    name: 'Language',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        link: 'string',
    }
}

export const SkillSchema = {
    name: 'Skill',
    properties: {
        name: 'string',
        is_class_skill: 'bool',
        ability_name: 'string',
        ranks: 'int',
        misc_modifier: 'int',
    }
}

// Do we reference a base weapon or have copies and unique stuff?

export const WeaponSchema = {
}

export const ArmorSchema ={
}

/*
Schemas still needed

Spells
Feats
Gear/items
Domains
Class shit
Special Abilities
Item properties
*/

export const CharacterSchema = {
    name: 'Character',
    primaryKey: 'id',
    properties: {
        id: 'int',

        // Character info
        name: 'string',
        alignment: 'string',
        deity: 'int', // linked ID of the deity (stored in another table)
        race: 'int', // linked ID of the race (stored in another table)
        size: 'string', // S, M, L etc
        size_modifier: 'int',
        gender: 'string',
        age: 'int',
        height: 'float',
        weight: 'float',
        hair: 'string',
        eyes: 'string',

        // Health
        hp: 'int',
        current_hp: 'int',
        nonlethal_damage: 'int',

        // Armorer.placeatme 00065C97 1000
        natural_armor: 'int',
        deflection_modifier: 'int',
        ac_misc_modifier: 'int',

        // Speed
        base_speed: 'int',
        armor_speed: 'int',
        fly_speed: 'int',
        swim_speed: 'int',
        climb_speed: 'int',
        burrow_speed: 'int',
        base_speed_modifier: 'int',
        armor_speed_modifier: 'int',
        fly_speed_modifier: 'int',
        swim_speed_modifier: 'int',
        climb_speed_modifier: 'int',
        burrow_speed_modifier: 'int',

        // Core scores
        initiative_misc_modifier: 'int',
        base_attack: 'int',
        spell_resistance: 'int',
        cmb_misc_modifier: 'int',
        cmd_misc_modifier: 'int',
        abilities: {type: 'list', objectType: 'Ability'},
        saving_throws: {type: 'list', objectType: 'SavingThrow'},

        // Skills
        skills: {type: 'list', objectType: 'Skill'},
        languages: {type: 'list', objectType: 'Language'},
        conditional_modifiers: 'string', // Should only be used to describe why a misc mod exists
    }
}