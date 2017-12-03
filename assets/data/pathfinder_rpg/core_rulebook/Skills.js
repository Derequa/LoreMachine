import { skill_ids } from './ids/SkillIDs';
import { ability_scores } from './AbilityScoreCodes';

const baseurl = 'http://www.d20pfsrd.com/skills/';

export const skill_data =
[
    {
        id: skill_ids.acrobatics,
        name: 'Acrobatics',
        description: 'You can keep your balance while traversing narrow or treacherous surfaces. You can also dive, flip, jump, and roll, avoiding attacks and confusing your opponents.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}acrobatics`
    },
    {
        id: skill_ids.appraise,
        name: 'Appraise',
        description: 'You can evaluate the monetary value of an object.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}appraise`
    },
    {
        id: skill_ids.bluff,
        name: 'Bluff',
        description: 'You know how to tell a lie.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}bluff`
    },
    {
        id: skill_ids.climb,
        name: 'Climb',
        description: 'You are skilled at scaling vertical surfaces, from smooth city walls to rocky cliffs.',
        ability_type: ability_scores.strength,
        url: `${baseurl}climb`
    },
    {
        id: skill_ids.craft,
        name: 'Craft',
        description: 'You are skilled in the creation of a specific group of items, such as armor or weapons.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}craft`
    },
    {
        id: skill_ids.diplomacy,
        name: 'Diplomacy',
        description: 'You can use this skill to persuade others to agree with your arguments, to resolve differences, and to gather valuable information or rumors from people. This skill is also used to negotiate conflicts by using the proper etiquette and manners suitable to the problem.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}diplomacy`
    },
    {
        id: skill_ids.disable_device,
        name: 'Disable Device',
        description: 'You are skilled at disarming traps and opening locks. In addition, this skill lets you sabotage simple mechanical devices, such as catapults, wagon wheels, and doors.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}disable-device`
    },
    {
        id: skill_ids.disguise,
        name: 'Disguise',
        description: 'You are skilled at changing your appearance.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}disguise`
    },
    {
        id: skill_ids.escape_artist,
        name: 'Escape Artist',
        description: 'Your training allows you to slip bonds and escape from grapples.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}escape-artist`
    },
    {
        id: skill_ids.fly,
        name: 'Fly',
        description: 'You are skilled at flying, either through the use of wings or magic, and you can perform daring or complex maneuvers while airborne. Note that this skill does not give you the ability to fly.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}fly`
    },
    {
        id: skill_ids.handle_animal,
        name: 'Handle Animal',
        description: 'You are trained at working with animals, and can teach them tricks, get them to follow your simple commands, or even domesticate them.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}handle-animal`
    },
    {
        id: skill_ids.heal,
        name: 'Heal',
        description: 'You are skilled at tending to the ailments of others.',
        ability_type: ability_scores.wisdom,
        url: `${baseurl}heal`
    },
    {
        id: skill_ids.intimidate,
        name: 'Intimidate',
        description: 'You can use this skill to frighten your opponents or to get them to act in a way that benefits you. This skill includes verbal threats and displays of prowess.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}intimidate`
    },
    {
        id: skill_ids.knowledge_arcana,
        name: 'Knowledge (arcana)',
        description: '(ancient mysteries, magic traditions, arcane symbols, constructs, dragons, magical beasts); Although robots are constructs, Knowledge (arcana) cannot be used to identify robots or their abilities and weaknesses.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_dungeoneering,
        name: 'Knowledge (dungeoneering)',
        description: '(aberrations, caverns, oozes, spelunking)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_engineering,
        name: 'Knowledge (engineering)',
        description: 'buildings, aqueducts, bridges, fortifications); This is the most important skill with regard to technological subjects. Knowledge (engineering) can be used to identify a robot’s abilities and weaknesses. Knowledge (engineering) is also used to identify and understand unknown technological objects in a similar manner to how Spellcraft is used to identify the properties of a magic item. The DC to correctly identify and understand an unknown technological object is equal to the object’s Craft DC. An object with a Craft DC of 15 or less can be automatically identified and understood by someone trained in Knowledge (engineering) who also has the Technologist feat.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_geography,
        name: 'Knowledge (geography)',
        description: '(lands, terrain, climate, people); Used for astronomy.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_history,
        name: 'Knowledge (history)',
        description: '(wars, colonies, migrations, founding of cities)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_local,
        name: 'Knowledge (local)',
        description: '(legends, personalities, inhabitants, laws, customs, traditions, humanoids)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_nature,
        name: 'Knowledge (nature)',
        description: '(animals, fey, monstrous humanoids, plants, seasons and cycles, weather, vermin)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_nobility,
        name: 'Knowledge (nobility)',
        description: '(lineages, heraldry, personalities, royalty)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_planes,
        name: 'Knowledge (planes)',
        description: '(the Inner Planes, the Outer Planes, the Astral Plane, the Ethereal Plane, outsiders, planar magic)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.knowledge_religion,
        name: 'Knowledge (religion)',
        description: '(gods and goddesses, mythic history, ecclesiastic tradition, holy symbols, undead)',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}knowledge`
    },
    {
        id: skill_ids.linguistics,
        name: 'Linguistics',
        description: 'You are skilled at working with language, in both its spoken and written forms. You can speak multiple languages, and can decipher nearly any tongue given enough time. Your skill in writing allows you to create and detect forgeries as well.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}linguistics`
    },
    {
        id: skill_ids.perception,
        name: 'Perception',
        description: 'Your senses allow you to notice fine details and alert you to danger. Perception covers all five senses, including sight, hearing, touch, taste, and smell.',
        ability_type: ability_scores.wisdom,
        url: `${baseurl}perception`
    },
    {
        id: skill_ids.perform,
        name: 'Perform',
        description: 'You are skilled at one form of entertainment, from singing to acting to playing an instrument. Like Craft, Knowledge, and Profession, Perform is actually a number of separate skills. You could have several Perform skills, each with its own ranks.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}perform`
    },
    {
        id: skill_ids.profession,
        name: 'Profession',
        description: 'You are skilled at a specific job. Like Craft, Knowledge, and Perform, Profession is actually a number of separate skills. You could have several Profession skills, each with its own ranks. ',
        ability_type: ability_scores.wisdom,
        url: `${baseurl}profession`
    },
    {
        id: skill_ids.ride,
        name: 'Ride',
        description: 'You are skilled at riding mounts, usually a horse, but possibly something more exotic, like a griffon or pegasus. If you attempt to ride a creature that is ill suited as a mount, you take a –5 penalty on your Ride checks.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}ride`
    },
    {
        id: skill_ids.sense_motive,
        name: 'Sense Motive',
        description: 'You are skilled at detecting falsehoods and true intentions.',
        ability_type: ability_scores.wisdom,
        url: `${baseurl}sense-motive`
    },
    {
        id: skill_ids.sleight_of_hand,
        name: 'Sleight Of Hand',
        description: 'Your training allows you to pick pockets, draw hidden weapons, and take a variety of actions without being noticed.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}sleight-of-hand`
    },
    {
        id: skill_ids.spellcraft,
        name: 'Spellcraft',
        description: 'You are skilled at the art of casting spells, identifying magic items, crafting magic items, and identifying spells as they are being cast.',
        ability_type: ability_scores.intelligence,
        url: `${baseurl}spellcraft`
    },
    {
        id: skill_ids.stealth,
        name: 'Stealth',
        description: 'You are skilled at avoiding detection, allowing you to slip past foes or strike from an unseen position. This skill covers hiding and moving silently.',
        ability_type: ability_scores.dexterity,
        url: `${baseurl}stealth`
    },
    {
        id: skill_ids.survival,
        name: 'Survival',
        description: 'You are skilled at surviving in the wild and at navigating in the wilderness. You also excel at following trails and tracks left by others.',
        ability_type: ability_scores.wisdom,
        url: `${baseurl}survival`
    },
    {
        id: skill_ids.swim,
        name: 'Swim',
        description: 'You know how to swim and can do so even in stormy water.',
        ability_type: ability_scores.strength,
        url: `${baseurl}swim`
    },
    {
        id: skill_ids.use_magic_device,
        name: 'Use Magic Device',
        description: 'You are skilled at activating magic items, even if you are not otherwise trained in their use.',
        ability_type: ability_scores.charisma,
        url: `${baseurl}use-magic-device`
    },
]