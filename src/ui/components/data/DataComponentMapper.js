// Map data types from realm to React Components
import BasicItem from './BasicItem';
import SkillComponent from './skills/SkillComponent';
import SpellComponent from './SpellComponent';

export const dataMap = {
    'Language': BasicItem,
    'SpellSchoolPower': BasicItem,
    'SpellSchool': BasicItem,
    'SkillInfo': SkillComponent,
    'Spell': SpellComponent,
}

export function hasScreen (data) { return (dataMap[data.object_name] !== undefined) }

export function navToDataScreen (navigation, data) {
    if (hasScreen(data))
        navigation.navigate('DataDisplay', {data}); 
}