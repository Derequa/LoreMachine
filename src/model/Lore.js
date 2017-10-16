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

export const SkillInfoSchema = {
    name: 'SkillInfo',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        details: 'string',
    }
}

export const SkillSchema = {
    name: 'Skill',
    properties: {
        name: 'string',
        base_id: 'int',
        is_class_skill: 'bool',
        ability_name: 'string',
        ranks: 'int',
        misc_modifier: 'int',
    }
}

export const PropertySchema = {
    name: 'Property',
    primaryKey: 'id', // Master list of all know properties. Integrated ones should affect stats automatically, custom ones will give description
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
    }
}

// Do we reference a base weapon or have copies and unique stuff?
// Base weapon that can be searched, instance weapon with custom properties
export const BaseWeaponSchema = {
    name: 'BaseWeapon',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        small_damage: 'string',
        medium_damage: 'string',
        large_damage: 'string',
        attack_bonus: 'int',
        critical: 'string',
        price: 'int',
        price_currency: 'string',
        weapon_type: 'string', // exotic, martial, simple etc
        damage_type: 'string', // P, B, S
        range: 'int',
        weight: 'int',
        weapon_special: {type: 'list', objectType: 'string'},
    } 
}

export const CustomWeaponSchema = {
    name: 'CustomWeapon',
    properties: {
        name: 'string', // User given name
        base_weapon_id: 'int', // The ID of the weapon this uses as a base
        special_properties: {type: 'list', objectType: 'Property'}
    }
}

export const BaseArmorSchema ={
    name: 'BaseArmor',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        type: 'string',
        description: 'string',
        ac_bonus: 'int',
        max_dex: 'int',
        check_penalty: 'int',
        spell_failure: 'float',
        weight: 'int',
        speed_reduction_30: 'int',
        speed_reduction_20: 'int',
        price: 'int',
    }
}

export const CustomArmorSchema = {
    name: 'CustomArmor',
    properties: {
        name: 'string', // User given name
        base_armor_id: 'int', // The ID of the weapon this uses as a base
        special_properties: {type: 'list', objectType: 'Property'}
    }
}

export const ClassLevelSchema = {
    name: 'ClassLevel',
    properties: {
        clazz: 'string', // avoid class name
        level: 'int',
    }
}

export const SpellSchoolSchema = {
    name: 'SpellSchool',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        powers: {type: 'list', objectType: 'string'},
    }
}

export const SpellSchema = {
    name: 'Spell',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        level: {type: 'list', objectType: 'ClassLevel'},
        school: 'id', // link to school entry
        casting_time: 'string',
        components: 'string',
        range: 'string',
        effect: 'string',
        duration: 'string',
        saving_throw: 'string',
        spell_resistance: 'string',
        description: 'string',
    }
}

export const ItemSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        weight: 'int',
        price: 'int',
        currency_type: 'string',
    }
}

export const InventoryItemSchema = {
    name: 'InventoryItem',
    properties: {
        item_type: 'string',
        item_id: 'int',
    }
}

export const SpecialAbilitySchema = {
    name: 'SpecialAbility',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
    }
}

export const FeatPreReqSchema = {
    name: 'FeatPreReq',
    properties: {
        ability_score: {type: 'list', objectType: 'Ability'},
        base_attack: 'int',
        clazz: {type: 'list', objectType: 'ClassLevel'},
        feats: {type: 'list', objectType: 'int'},
        skills: {type: 'list', objectType: 'Skill'},
        special_ability_names: {type: 'list', objectType: 'string'}
    }
}

export const FeatSchema = {
    name: 'Feat',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        prereqs: {type: 'list', objectType: 'FeatPreReq'}
    }
}

export const ClericDomainSchema = {
    name: 'ClericDomain',
    primaryKey: 'int',
    properties: {
        id: 'int',
        name: 'string',
        alignment: 'string',
        deities: {type: 'list', objectType: 'int'}, // IDs of deity
        powers: {type: 'list', objectType: 'int'}, // IDs of cleric power
        spells: {type: 'list', objectType: 'int'}, // IDs of spells
    }
}

export const SorcererBloodlineSchema = {
    name: 'SorcererBloodline',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: 'string',
        description: 'string',
        class_skill: {type: 'Skill'},
        bonus_spells: {type: 'list', objectType: 'int'},
        bloodline_powers: {type: 'list', objectType: 'int'}, // IDs of bloodline powers
        bloodline_arcana: 'int', // ID of bloodline arcana
    }
}

/*
Schemas still needed

Bloodline powers
Bloodline Arcana
Cleric powers
Class Features
Wizzard School
Wizzard School Powers

Effects: a way to abstract the stat effects of some feats/special abilities
*/

export const CharacterSchema = {
    name: 'Character',
    primaryKey: 'id',
    properties: {
        id: 'int',

        // Character info
        name: 'string',
        alignment: 'string',
        level: 'int',
        xp: 'int',
        clazz: 'String',
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
        languages: {type: 'list', objectType: 'int'},
        conditional_modifiers: 'string', // Should only be used to describe why a misc mod exists

        // Items
        regular_weapons: {type: 'list', objectType: 'int'},
        custom_weapons: {type: 'list', objectType: 'CustomWeapon'},
        regular_ac_items: {type: 'list', objectType: 'int'},
        custom_ac_items: {type: 'list', objectType: 'CustomArmor'},
        inventory: {type: 'list', objectType: 'InventoryItem'},

        // Money
        pp: 'int',
        gp: 'int',
        sp: 'int',
        cp: 'int',

        // Special
        class_features: {type: 'list', objectType: 'int'},
        special_abilities: {type: 'list', objectType: 'int'},
        feats: {type: 'list', objectType: 'int'},
        domains: {type: 'list', objectType: 'int'},
        specialty_schools: {type: 'list', objectType: 'int'},
        bloodline: {type: 'list', objectType: 'int'},

        // Spells
        spells_known: {type: 'list', objectType: 'int'}, // IDs of spells
        num_spells_known_base: 'int', // Base number of spells known without any modifiers
        spell_save_dc: 'int',
        base_spells_per_day: 'int',
        bonus_spells_per_day: 'int',
        spell_conditionals: 'string',
        
    }
}

export const Lore = [

];