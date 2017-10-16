import React from 'react';
import { AppRegistry}  from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharacterSelectorScreen from './ui/screens/CharacterSelectorScreen';
import UnderDevelopmentScreen from './ui/screens/UnderDevelopmentScreen';
import Config from 'react-native-config'

console.log(Config.MODE);

export const MainAppStack = StackNavigator({
    Home: {
        title: 'Hello Stupid',
        screen: (Config.MODE === 'develop' ? CharacterSelectorScreen : UnderDevelopmentScreen),
    },
    NopeScreen: {
        title: 'Nope',
        screen: UnderDevelopmentScreen,
    }},
    { headerMode: 'screen' },
);

AppRegistry.registerComponent('LoreMachine', () => MainAppStack);