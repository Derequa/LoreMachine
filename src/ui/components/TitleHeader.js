import React from 'react';
import {
    Header,
    Left,
    Button,
    Icon,
    Title
} from 'native-base';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';
import { NavigationActions } from 'react-navigation';

export default class TitleHeader extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Header
            style={{backgroundColor: colors.transparent}}
            androidStatusBarColor={appDefaults.searchHeaderBarColor}
            iosBarStyle={appDefaults.searchHeaderBarStyle}>
                <Left style={{flex: 1, flexDirection: 'row'}}>
                    <Button transparent onPress={this._goBack}>
                        <Icon name={appDefaults.searchHeaderBackIcon} style={{color: colors.white}}/>
                    </Button>
                    <Title style={{alignSelf: 'center', paddingLeft: 5}}>{this.props.title}</Title>
                </Left>
            </Header>
        );
    }

    _goBack = () => { this.props.navigation.dispatch(NavigationActions.back()) }
}