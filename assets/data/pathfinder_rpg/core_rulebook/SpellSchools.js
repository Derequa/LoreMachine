export const spell_school_ids = {
        abjuration: 0,
        conjuration: 1,
        divination: 2,
        enchantment: 3,
        evocation: 4,
        illusion: 5,
        necromancy: 6,
        transmutation: 7,
        universalist: 8,
}

export const spell_school_data =
[
    {
        id: spell_school_ids.abjuration,
        name: 'Abjuration',
        description: 'The abjurer uses magic against itself, and masters the art of defensive and warding magics.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/abjuration/',
        powers:
        [
            {
                name: 'Resistance',
                description: 'You gain resistance 5 to an energy type of your choice, chosen when you prepare spells. This resistance can be changed each day. At 11th level, this resistance increases to 10. At 20th level, this resistance changes to immunity to the chosen energy type.',
            },
            {
                name: 'Protective Ward',
                description: 'As a standard action, you can create a 10-foot-radius field of protective magic centered on you that lasts for a number of rounds equal to your Intelligence modifier. All allies in this area (including you) receive a +1 deflection bonus to their Armor Class. This bonus increases by +1 for every five wizard levels you possess. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.',
            },
            {
                name: 'Energy Absorption',
                description: 'At 6th level, you gain an amount of energy absorption equal to 3 times your wizard level per day. Whenever you take energy damage, apply immunity, vulnerability (if any), and resistance first and apply the rest to this absorption, reducing your daily total by that amount. Any damage in excess of your absorption is applied to you normally.',
            }
        ]
    },
    { 
        id: spell_school_ids.conjuration,
        name: 'Conjuration',
        description: 'The conjurer focuses on the study of summoning monsters and magic alike to bend to his will.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/conjuration/', 
        powers:
        [
            {
                name: 'Summoner’s Charm',
                description: 'Whenever you cast a conjuration (summoning) spell, increase the duration by a number of rounds equal to 1/2 your wizard level (minimum 1). This increase is not doubled by Extend Spell. At 20th level, you can change the duration of all summon monster spells to permanent. You can have no more than one summon monster spell made permanent in this way at one time. If you designate another summon monster spell as permanent, the previous spell immediately ends.'
            },
            {
                name: 'Acid Dart',
                description: 'As a standard action you can unleash an acid dart targeting any foe within 30 feet as a ranged touch attack. The acid dart deals 1d6 points of acid damage + 1 for every two wizard levels you possess. You can use this ability a number of times per day equal to 3 + your Intelligence modifier. This attack ignores spell resistance.'
            },
            {
                name: 'Dimensional Steps',
                description: 'At 8th level, you can use this ability to teleport up to 30 feet per wizard level per day as a standard action. This teleportation must be used in 5-foot increments and such movement does not provoke an attack of opportunity. You can bring other willing creatures with you, but you must expend an equal amount of distance for each additional creature brought with you.'
            }
        ]
    },
    {
        id: spell_school_ids.divination,
        name: 'Divination',
        description: 'Diviners are masters of remote viewing, prophecies, and using magic to explore the world.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/divination/', 
        powers:
        [
            {
                name: 'Forewarned',
                description: 'You can always act in the surprise round even if you fail to make a Perception roll to notice a foe, but you are still considered flat-footed until you take an action. In addition, you receive a bonus on initiative checks equal to 1/2 your wizard level (minimum +1). At 20th level, anytime you roll initiative, assume the roll resulted in a natural 20.'
            },
            {
                name: 'Diviner’s Fortune',
                description: 'When you activate this school power, you can touch any creature as a standard action to give it an insight bonus on all of its attack rolls, skill checks, ability checks, and saving throws equal to 1/2 your wizard level (minimum +1) for 1 round. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Scrying Adept',
                description: 'At 8th level, you are always aware when you are being observed via magic, as if you had a permanent detect scrying. In addition, whenever you scry on a subject, treat the subject as one step more familiar to you. Very familiar subjects get a –10 penalty on their save to avoid your scrying attempts. '
            }
        ]
    },
    {
        id: spell_school_ids.enchantment,
        name: 'Enchantment',
        description: 'The enchanter uses magic to control and manipulate the minds of his victims.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/enchantment/', 
        powers:
        [
            {
                name: 'Enchanting Smile',
                description: 'You gain a +2 enhancement bonus on Bluff, Diplomacy, and Intimidate skill checks. This bonus increases by +1 for every five wizard levels you possess, up to a maximum of +6 at 20th level. At 20th level, whenever you succeed at a saving throw against a spell of the enchantment school, that spell is reflected back at its caster, as per spell turning. '
            },
            {
                name: 'Dazing Touch',
                description: 'You can cause a living creature to become dazed for 1 round as a melee touch attack. Creatures with more Hit Dice than your wizard level are unaffected. You can use this ability a number of times per day equal to 3 + your Intelligence modifier. '
            },
            {
                name: 'Aura of Despair',
                description: 'At 8th level, you can emit a 30-foot aura of despair for a number of rounds per day equal to your wizard level. Enemies within this aura take a –2 penalty on ability checks, attack rolls, damage rolls, saving throws, and skill checks. These rounds do not need to be consecutive. This is a mind-affecting effect.'
            }
        ]
    },
    {
        id: spell_school_ids.evocation,
        name: 'Evocation',
        description: 'Evokers revel in the raw power of magic, and can use it to create and destroy with shocking ease.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/evocation/', 
        powers:
        [
            {
                name: 'Intense Spells',
                description: 'Whenever you cast an evocation spell that deals hit point damage, add 1/2 your wizard level to the damage (minimum +1). This bonus only applies once to a spell, not once per missile or ray, and cannot be split between multiple missiles or rays. This bonus damage is not increased by Empower Spell or similar effects. This damage is of the same type as the spell. At 20th level, whenever you cast an evocation spell you can roll twice to penetrate a creature’s spell resistance and take the better result.'
            },
            {
                name: 'Force Missile',
                description: 'As a standard action you can unleash a force missile that automatically strikes a foe, as magic missile. The force missile deals 1d4 points of damage plus the damage from your intense spells evocation power. This is a force effect. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Elemental Wall',
                description: 'At 8th level, you can create a wall of energy that lasts for a number of rounds per day equal to your wizard level. These rounds do not need to be consecutive. This wall deals acid, cold, electricity, or fire damage, determined when you create it. The elemental wall otherwise functions like wall of fire.'
            }
        ]
    },
    {
        id: spell_school_ids.illusion,
        name: 'Illusion',
        description: 'Illusionists use magic to weave confounding images, figments, and phantoms to baffle and vex their foes.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/illusion/', 
        powers:
        [
            {
                name: 'Extended Illusions',
                description: 'Any illusion spell you cast with a duration of “concentration” lasts a number of additional rounds equal to 1/2 your wizard level after you stop maintaining concentration (minimum +1 round). At 20th level, you can make one illusion spell with a duration of “concentration” become permanent. You can have no more than one illusion made permanent in this way at one time. If you designate another illusion as permanent, the previous permanent illusion ends.'
            },
            {
                name: 'Blinding Ray',
                description: 'As a standard action you can fire a shimmering ray at any foe within 30 feet as a ranged touch attack. The ray causes creatures to be blinded for 1 round. Creatures with more Hit Dice than your wizard level are dazzled for 1 round instead. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Invisibility Field',
                description: 'At 8th level, you can make yourself Invisible as a swift action for a number of rounds per day equal to your wizard level. These rounds do not need to be consecutive. This otherwise functions as greater invisibility.'
            }
        ]
    },
    {
        id: spell_school_ids.necromancy,
        name: 'Necromancy',
        description: 'The dread and feared necromancer commands undead and uses the foul power of unlife against his enemies.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/necromancy/', 
        powers:
        [
            {
                name: 'Power over Undead',
                description: 'You receive Command Undead or Turn Undead as a bonus feat. You can channel energy a number of times per day equal to 3 + your Intelligence modifier, but only to use the selected feat. You can take other feats to add to this ability, such as Extra Channel and Improved Channel, but not feats that alter this ability, such as Elemental Channel and Alignment Channel. The DC to save against these feats is equal to 10 + 1/2 your wizard level + your Charisma modifier. At 20th level, undead cannot add their channel resistance to the save against this ability.'
            },
            {
                name: 'Grave Touch',
                description: 'As a standard action, you can make a melee touch attack that causes a living creature to become shaken for a number of rounds equal to 1/2 your wizard level (minimum 1). If you touch a shaken creature with this ability, it becomes frightened for 1 round if it has fewer Hit Dice than your wizard level. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Life Sight',
                description: 'At 8th level, you gain blindsight to a range of 10 feet for a number of rounds per day equal to your wizard level. This ability only allows you to detect living creatures and undead creatures. This sight also tells you whether a creature is living or undead. Constructs and other creatures that are neither living nor undead cannot be seen with this ability. The range of this ability increases by 10 feet at 12th level, and by an additional 10 feet for every four levels beyond 12th. These rounds do not need to be consecutive.'
            }
        ]
    },
    {   id: spell_school_ids.transmutation,
        name: 'Transmutation',
        description: 'Transmuters use magic to change the world around them',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/transmutation/', 
        powers:
        [
            {
                name: 'Physical Enhancement',
                description: 'You gain a +1 enhancement bonus to one physical ability score (Strength, Dexterity, or Constitution). This bonus increases by +1 for every five wizard levels you possess to a maximum of +5 at 20th level. You can change this bonus to a new ability score when you prepare spells. At 20th level, this bonus applies to two physical ability scores of your choice.'
            },
            {
                name: 'Telekinetic Fist',
                description: 'As a standard action you can strike with a telekinetic fist, targeting any foe within 30 feet as a ranged touch attack. The telekinetic fist deals 1d4 points of bludgeoning damage + 1 for every two wizard levels you possess. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Change Shape',
                description: 'At 8th level, you can change your shape for a number of rounds per day equal to your wizard level. These rounds do not need to be consecutive. This ability otherwise functions like beast shape II or elemental body I. At 12th level, this ability functions like beast shape III or elemental body II.'
            }
        ]
    },
    {
        id: spell_school_ids.universalist,
        name: 'Universalist',
        description: 'Wizards who do not specialize (known as as universalists) have the most diversity of all arcane spellcasters.',
        url: 'http://www.d20pfsrd.com/classes/core-classes/wizard/arcane-schools/paizo-arcane-schools/classic-arcane-schools/universalist/', 
        powers:
        [
            {
                name: 'Hand of the Apprentice',
                description: 'You cause your melee weapon to fly from your grasp and strike a foe before instantly returning to you. As a standard action, you can make a single attack using a melee weapon at a range of 30 feet. This attack is treated as a ranged attack with a thrown weapon, except that you add your Intelligence modifier on the attack roll instead of your Dexterity modifier (damage still relies on Strength). This ability cannot be used to perform a combat maneuver. You can use this ability a number of times per day equal to 3 + your Intelligence modifier.'
            },
            {
                name: 'Metamagic Mastery',
                description: 'At 8th level, you can apply any one metamagic feat that you know to a spell you are about to cast. This does not alter the level of the spell or the casting time. You can use this ability once per day at 8th level and one additional time per day for every two wizard levels you possess beyond 8th. Any time you use this ability to apply a metamagic feat that increases the spell level by more than 1, you must use an additional daily usage for each level above 1 that the feat adds to the spell. Even though this ability does not modify the spell’s actual level, you cannot use this ability to cast a spell whose modified spell level would be above the level of the highest-level spell that you are capable of casting.'
            }
        ]
    }
]
