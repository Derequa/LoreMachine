import React from 'react';
import {
    Container,
    Content,
    Text,
    Header,
    View,
} from 'native-base';
import {
    Image,
    ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import RealmManager from '../../managers/RealmManager';
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
        //setTimeout(() => {this.props.navigation.navigate('CharacterSelector')}, 3000);
        let startTime = new Date().getTime();
        RealmManager.getRealm()
        .then(() => {
            let endTime = new Date().getTime();
            if (endTime - startTime > max_show_off_time)
                this.props.navigation.navigate('CharacterSelector');
            else
                setTimeout(this._goToSelector.bind(this), (max_show_off_time - (endTime - startTime)));
        });
    }

    _goToSelector() {
        this.props.navigation.dispatch(navAction);
    }

    // TODO: fix centering issues bc header
    // Have to use header for status bar color
    render() {
        return (
            <Container style={{backgroundColor: colors.black}}>
            <Header
            style={{backgroundColor: colors.transparent}}
            androidStatusBarColor={colors.black}
            iosBarStyle='light-content'/>
                <Content contentContainerStyle={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
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
                </Content>
            </Container>
        );
    }
}
