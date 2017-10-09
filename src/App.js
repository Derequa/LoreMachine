import React from 'react';
import { AppRegistry}  from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharacterSelectorScreen from './ui/screens/CharacterSelectorScreen';
import CharacterInfoScreen from './ui/screens/CharacterInfoScreen';
import CharacterEditScreen from './ui/screens/CharacterEditScreen';
import UnderDevelopmentScreen from './ui/screens/UnderDevelopmentScreen';
import Config from 'react-native-config'

console.log(Config.MODE);

export const MainAppStack = StackNavigator({
    Home: {
        title: "Hello Stupid",
        screen: (Config.MODE === 'develop' ? CharacterSelectorScreen : UnderDevelopmentScreen),
    },
    ChacterInfo: {
        title: "Character Info",
        screen: CharacterInfoScreen,
    },
    CharcterEdit: {
        title: "Edit Character",
        screen: CharacterEditScreen,
    }},
    { headerMode: 'screen' },
);

AppRegistry.registerComponent('LoreMachine', () => MainAppStack);