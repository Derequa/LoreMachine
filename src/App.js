import React from 'react';
import { AppRegistry}  from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharacterSelectorScreen from './screens/CharacterSelectorScreen';
import CharacterInfoScreen from './screens/CharacterInfoScreen';
import CharacterEditScreen from './screens/CharacterEditScreen';

export const MainAppStack = StackNavigator({
    Home: {
        title: "Hello Stupid",
        screen: CharacterSelectorScreen,
    },
    ChacterInfo: {
        title: "Character Info",
        screen: CharacterInfoScreen,
    },
    CharcterEdit: {
        title: "Edit Character",
        screen: CharacterEditScreen,
    }
});

AppRegistry.registerComponent('LoreMachine', () => MainAppStack);