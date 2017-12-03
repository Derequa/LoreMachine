import React from 'react';
import {
    AppRegistry,
 //   Animated,
//    Easing
}  from 'react-native';
import { StackNavigator } from 'react-navigation';
import CharacterSelectorScreen from './ui/screens/CharacterSelectorScreen';
import UnderDevelopmentScreen from './ui/screens/UnderDevelopmentScreen';
import SearchResultsScreen from './ui/screens/SearchResultsScreen';
import StartupScreen from './ui/screens/StartupScreen';
import DataDisplayScreen from './ui/screens/DataDisplayScreen';
import DataBrowserScreen from './ui/screens/DataBrowserScreen';
import DataBrowserListScreen from './ui/screens/DataBrowserListScreen';
import Config from 'react-native-config';
import { MenuContext } from 'react-native-popup-menu';

console.log(Config.MODE);
/*
const transitionConfig = () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0,
    },
});
*/
const navigationOptions = {
    headerMode: 'screen'
}

export const MainAppStack = StackNavigator({
    Start: {
        screen: (Config.MODE === 'develop' ? StartupScreen : UnderDevelopmentScreen),
    },
    CharacterSelector: {
        screen: CharacterSelectorScreen,
    },
    NopeScreen: {
        screen: UnderDevelopmentScreen,
    },
    SearchResults: {
        screen: SearchResultsScreen,
    },
    DataDisplay: {
        screen: DataDisplayScreen,
    },
    DataBrowser: {
        screen: DataBrowserScreen,
    },
    DataBrowserList: {
        screen: DataBrowserListScreen,
    }
}, navigationOptions,);

export const App = () => (
    <MenuContext>
        <MainAppStack/>
    </MenuContext>
)

AppRegistry.registerComponent('LoreMachine', () => App);