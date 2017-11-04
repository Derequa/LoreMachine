import { spell_school_ids } from './ids/SpellSchoolIDs';
import { spell_school_power_ids } from './ids/SpellSchoolPowerIDs';

export const spell_school_data =
[
    {
        id: spell_school_ids.abjuration,
        name: 'Abjuration',
        description: 'The abjurer uses magic against itself, and masters the art of defensive and warding magics.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/abjuration/',
        powers:
        [
            spell_school_power_ids.resistance,
            spell_school_power_ids.protective_ward,
            spell_school_power_ids.energy_absorption    
        ]
    },
    { 
        id: spell_school_ids.conjuration,
        name: 'Conjuration',
        description: 'The conjurer focuses on the study of summoning monsters and magic alike to bend to his will.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/conjuration/', 
        powers:
        [
            spell_school_power_ids.summoners_charm,
            spell_school_power_ids.acid_dart,
            spell_school_power_ids.dimensional_steps
        ]
    },
    {
        id: spell_school_ids.divination,
        name: 'Divination',
        description: 'Diviners are masters of remote viewing, prophecies, and using magic to explore the world.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/divination/', 
        powers:
        [
            spell_school_power_ids.forewarned,
            spell_school_power_ids.diviners_fortune,
            spell_school_power_ids.scrying_adept
        ]
    },
    {
        id: spell_school_ids.enchantment,
        name: 'Enchantment',
        description: 'The enchanter uses magic to control and manipulate the minds of his victims.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/enchantment/', 
        powers:
        [
            spell_school_power_ids.enchanting_smile,
            spell_school_power_ids.dazing_touch,
            spell_school_power_ids.aura_of_despair
        ]
    },
    {
        id: spell_school_ids.evocation,
        name: 'Evocation',
        description: 'Evokers revel in the raw power of magic, and can use it to create and destroy with shocking ease.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/evocation/', 
        powers:
        [
            spell_school_power_ids.intense_spells,
            spell_school_power_ids.force_missile,
            spell_school_power_ids.elemental_wall
        ]
    },
    {
        id: spell_school_ids.illusion,
        name: 'Illusion',
        description: 'Illusionists use magic to weave confounding images, figments, and phantoms to baffle and vex their foes.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/illusion/', 
        powers:
        [
            spell_school_power_ids.extended_illusions,
            spell_school_power_ids.blinding_ray,
            spell_school_power_ids.invisibility_field
        ]
    },
    {
        id: spell_school_ids.necromancy,
        name: 'Necromancy',
        description: 'The dread and feared necromancer commands undead and uses the foul power of unlife against his enemies.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/necromancy/', 
        powers:
        [
            spell_school_power_ids.power_over_undead,
            spell_school_power_ids.grave_touch,
            spell_school_power_ids.life_sight
        ]
    },
    {   id: spell_school_ids.transmutation,
        name: 'Transmutation',
        description: 'Transmuters use magic to change the world around them',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/transmutation/', 
        powers:
        [
            spell_school_power_ids.physical_enhancement,
            spell_school_power_ids.telekinetic_fist,
            spell_school_power_ids.change_shape
        ]
    },
    {
        id: spell_school_ids.universalist,
        name: 'Universalist',
        description: 'Wizards who do not specialize (known as as universalists) have the most diversity of all arcane spellcasters.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/universalist/', 
        powers:
        [
            spell_school_power_ids.hand_of_the_apprentice,
            spell_school_power_ids.metamagic_mastery
        ]
    }
]
