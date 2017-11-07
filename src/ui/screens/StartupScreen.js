import React from 'react';
import {
    Image,
    Text,
    View,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RealmManager from '../../managers/RealmManager';
import SettingsManager from '../../managers/SettingsManager';
import { NavigationActions } from 'react-navigation';
import { colors } from '../colors';

const image = require('../../../assets/loremachine.png');
const messages =
[
    'rolling for initiative...',
    'intimidating the dragon...',
    'removing arrow from knee...',
    'lightning bolt! lightning bolt!',
    'feeding the voidfish...',
    'halting the balrog...',
    'bringing out the dead...',
    'we know',
    'seducing the npc...',
    'ignoring the main quest...',
    'rolling to resist charm...',
    'fetching DM...',
    'planning your demise...',
    'building a dice tower...',
    'formulating traumatic back stories...',
    'killing the party...',
    'forging the ring...',
    'detecting evil...',
    'kink-shaming the rogue...',
    'slaying the princess...',
    'searching for traps...',
    'farting on the diplomacy check...'
];
const msgIndex = Math.floor(Math.random() * messages.length);
const max_show_off_time = 2000;
const navAction = NavigationActions.navigate({routeName: 'CharacterSelector'});

export default class StartupScreen extends React.Component {
    
    static navigationOptions = { header: null };
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let startTime = new Date().getTime();
        this._initTheStuff()
        .then(() => {
            let endTime = new Date().getTime();
            if (endTime - startTime > max_show_off_time)
                this.props.navigation.navigate('CharacterSelector');
            else
                setTimeout(this._goToSelector.bind(this), (max_show_off_time - (endTime - startTime)));
        });
    }

    async _initTheStuff() {
        await RealmManager.getRealm();
        await SettingsManager.get();
    }

    _goToSelector() {
        this.props.navigation.dispatch(navAction);
    }

    // TODO: fix centering issues bc header
    // Have to use header for status bar color
    render() {
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.black,
            }}>
                <StatusBar barStyle='light-content' backgroundColor={colors.black}/>
                <Animatable.Image
                animation='bounce'
                iterationCount='infinite'
                style={{
                    height: 190,
                    width: 190,
                }}
                source={image}/>
                <Text style={{
                    color: colors.white,
                    fontSize: 20,
                    fontWeight: 'bold',
                    fontStyle: 'italic'
                }}>
                    {messages[msgIndex]}
                </Text>
            </View>
        );
    }
}
