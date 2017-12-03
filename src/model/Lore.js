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
        name: { type: 'string', indexed: true },
        description: 'string',
        url: 'string',
    }
}

export const SkillInfoSchema = {
    name: 'SkillInfo',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        ability_type: 'string', // 3 letter code
        url: 'string',
    }
}

export const SkillSchema = {
    name: 'Skill',
    properties: {
        name: 'string',
        base_id: 'int',
        ranks: 'int',
        misc_modifier: 'int',
    }
}

export const PropertySchema = {
    name: 'Property',
    primaryKey: 'id', // Master list of all know properties. Integrated ones should affect stats automatically, custom ones will give description
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
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
        name: { type: 'string', indexed: true },
        description: 'string',
        url: 'string',
        small_damage: 'string',
        medium_damage: 'string',
        large_damage: 'string',
        attack_bonus: 'int',
        critical: 'string',
        price: 'int',
        price_currency: 'string',
        weapon_type: 'string', // exotic, martial, simple etc
        weapon_usage: 'string',
        damage_type: 'string', // P, B, S
        range: 'int',
        weight: 'int',
        ammo: 'int', // Ammo item id
        weapon_special: 'int[]',
    } 
}

export const CustomWeaponSchema = {
    name: 'CustomWeapon',
    properties: {
        name: 'string', // User given name
        base_weapon_id: 'int', // The ID of the weapon this uses as a base
        special_properties: 'Property[]'
    }
}

export const BaseArmorSchema ={
    name: 'BaseArmor',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        type: 'string',
        description: 'string',
        url: 'string',
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
        special_properties: 'Property[]'
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
        name: { type: 'string', indexed: true },
        description: 'string',
        url: 'string',
        powers: 'int[]',
    }
}

export const SpellSchema = {
    name: 'Spell',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        level: 'ClassLevel[]',
        school: { type: 'string', indexed: true },
        type: { type: 'string', indexed: true },
        casting_time: 'string?',
        components: 'string',
        range: 'string?',
        effect: 'string',
        duration: 'string',
        saving_throw: 'string?',
        spell_resistance: 'string?',
        description: 'string',
        url: 'string',
    }
}

export const ItemSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        url: 'string',
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

export const GenericSpecialAbilitySchema= {
    name: 'GenericSpecialAbility',
    properties: {
        name: 'string',
        description: 'string',
    }
}

export const SpecialAbilitySchema = {
    name: 'SpecialAbility',
    primaryKey: 'id',
    properties: {
        id: 'int',
        ability: {type: 'GenericSpecialAbility'},
        url: 'string',
    }
}

export const FeatPreReqSchema = {
    name: 'FeatPreReq',
    properties: {
        ability_score: 'Ability[]',
        base_attack: 'int',
        clazz: 'ClassLevel[]',
        feats: 'int[]',
        class_features: 'int[]',
        skills: 'Skill[]',
        special_ability_names: 'string[]'
    }
}

export const FeatSchema = {
    name: 'Feat',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        type: 'string',
        description: 'string',
        url: 'string',
        prereqs: 'FeatPreReq[]'
    }
}

export const ClericPowerSchema = {
    name: 'ClericPower',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        parent_id: 'int',
    }
}

export const ClericDomainSchema = {
    name: 'ClericDomain',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        url: 'string',
        alignment: 'string',
        deities: 'int[]', // IDs of deity
        powers: 'int[]', // IDs of cleric power
        spells: 'int[]', // IDs of spells
    }
}

export const BloodlinePowerSchema = {
    name: 'BloodlinePower',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        parent_id: 'int',
    }
}

export const SorcererBloodlineSchema = {
    name: 'SorcererBloodline',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        url: 'string',
        class_skill: {type: 'Skill'},
        bonus_spells: 'int[]',
        bloodline_powers: 'int[]', // IDs of bloodline powers
        bloodline_arcana: 'string',
    }
}

export const ClassFeatureSchema = {
    name: 'ClassFeature',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        clazz: 'string', // Will we also need IDs for classes? Or will classes be "headless" in the data model?
    }
}

export const SpellSchoolPowerSchema = {
    name: 'SpellSchoolPower',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
        parent_id: 'int',
    }
}

export const ClassSchema = {
    name: 'Clazz',
    primaryKey: 'id',
    properties: {
        id: 'int',
        name: { type: 'string', indexed: true },
        description: 'string',
    }
}
// TODO:
/*
Schemas still needed
Class
Race
Deity
Effects: a way to abstract the stat effects of some feats/special abilities
*/

export const CharacterSchema = {
    name: 'Character',
    primaryKey: 'id',
    properties: {
        id: 'int',

        // Character info
        name: { type: 'string', indexed: true },
        bio: { type: 'string', indexed: true },
        alignment: 'string',
        level: 'int',
        xp: 'int',
        clazz: 'int',
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
        abilities: 'Ability[]',
        saving_throws: 'SavingThrow[]',

        // Skills
        skills: 'Skill[]',
        languages: 'int[]',
        conditional_modifiers: 'string', // Should only be used to describe why a misc mod exists

        // Items
        regular_weapons: 'int[]',
        custom_weapons: 'CustomWeapon[]',
        regular_ac_items: 'int[]',
        custom_ac_items: 'CustomArmor[]',
        inventory: 'InventoryItem[]',

        // Money
        pp: 'int',
        gp: 'int',
        sp: 'int',
        cp: 'int',

        // Special
        class_features: 'int[]',
        special_abilities: 'int[]',
        feats: 'int[]',
        domains: 'int[]',
        specialty_schools: 'int[]',
        opposed_schools: 'int[]',
        bloodline: 'int[]',

        // Spells
        spells_known: 'int[]', // IDs of spells
        num_spells_known_base: 'int', // Base number of spells known without any modifiers
        spell_save_dc: 'int',
        base_spells_per_day: 'int',
        bonus_spells_per_day: 'int',
        spell_conditionals: 'string',
        
    }
}

const basic_query_string = 'name CONTAINS[c] \"<value>\"';

// not including: propertyschema, specialabilityschema
export const searchable_schemas =
[
    {
        object_name: 'Language',
        type_display_name: 'Language',
        filter: basic_query_string,
    },
    {
        object_name: 'SkillInfo',
        type_display_name: 'Skill',
        filter: basic_query_string,
    },
    {
        object_name: 'BaseWeapon',
        type_display_name: 'Weapon',
        filter: basic_query_string,
    },
    {
        object_name: 'BaseArmor',
        type_display_name: 'Armor',
        filter: basic_query_string,
    },
    {
        object_name: 'SpellSchoolPower',
        type_display_name: 'Spell School Power',
        filter: basic_query_string,
    },
    {
        object_name: 'SpellSchool',
        type_display_name: 'Spell School',
        filter: basic_query_string,
    },
    {
        object_name: 'Spell',
        type_display_name: 'Spell',
        filter: 'name CONTAINS[c] \"<value>\" OR type CONTAINS[c] \"<value>\" OR school CONTAINS[c] \"<value>\"',
    },
    {
        object_name: 'Item',
        type_display_name: 'Item',
        filter: basic_query_string,
    },
    {
        object_name: 'Feat',
        type_display_name: 'Feat',
        filter: basic_query_string,
    },
    {
        object_name: 'ClericPower',
        type_display_name: 'Cleric Power',
        filter: basic_query_string,
    },
    {
        object_name: 'ClericDomain',
        type_display_name: 'Cleric Domain',
        filter: basic_query_string,
    },
    {
        object_name: 'BloodlinePower',
        type_display_name: 'Sorcerer Bloodline Power',
        filter: basic_query_string,
    },
    {
        object_name: 'SorcererBloodline',
        type_display_name: 'Sorcerer Bloodline',
        filter: basic_query_string,
    },
    {
        object_name: 'ClassFeature',
        type_display_name: 'Class Feature',
        filter: basic_query_string,
    },
    {
        object_name: 'Character',
        type_display_name: 'Character',
        filter: basic_query_string,
    }
]

export const Lore = [
    AbilitySchema,
    SavingThrowSchema,
    LanguageSchema,
    SkillInfoSchema,
    SkillSchema,
    PropertySchema,
    BaseWeaponSchema,
    CustomWeaponSchema,
    BaseArmorSchema,
    CustomArmorSchema,
    ClassLevelSchema,
    SpellSchoolPowerSchema,
    SpellSchoolSchema,
    SpellSchema,
    ItemSchema,
    InventoryItemSchema,
    GenericSpecialAbilitySchema,
    SpecialAbilitySchema,
    FeatPreReqSchema,
    FeatSchema,
    ClericDomainSchema,
    SorcererBloodlineSchema,
    BloodlinePowerSchema,
    ClericPowerSchema,
    ClassFeatureSchema,
    CharacterSchema,
];