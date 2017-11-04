import React from 'react';
import { AppRegistry}  from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharacterSelectorScreen from './ui/screens/CharacterSelectorScreen';
import UnderDevelopmentScreen from './ui/screens/UnderDevelopmentScreen';
import SearchResultsScreen from './ui/screens/SearchResultsScreen';
import Config from 'react-native-config'

console.log(Config.MODE);

export const MainAppStack = StackNavigator({
    Home: {
        screen: (Config.MODE === 'develop' ? CharacterSelectorScreen : UnderDevelopmentScreen),
    },
    NopeScreen: {
        screen: UnderDevelopmentScreen,
    },
    SearchResults: {
        screen: SearchResultsScreen,
    }
}, { 
    headerMode: 'screen' 
},);

AppRegistry.registerComponent('LoreMachine', () => MainAppStack);