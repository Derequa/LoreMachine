import React from 'react';
import {
    Container,
    Header,
    Left,
    Title,
    Button,
    Icon
} from 'native-base';
import { dataMap } from '../components/data/DataComponentMapper';
import { NavigationActions } from 'react-navigation';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';

export default class DataDisplayScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.data = props.navigation.state.params.data;
    }

    _goBack = () => { this.props.navigation.dispatch(NavigationActions.back()) }

    render() {
        const RenderComponent = dataMap[this.data.object_name];

        if (!RenderComponent)
            return null;
        
        return (
            <Container style={appStyles.mainContainer}>
                <Header
                style={{backgroundColor: colors.transparent}}
                androidStatusBarColor={appDefaults.searchHeaderBarColor}
                iosBarStyle={appDefaults.searchHeaderBarStyle}>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <Button transparent onPress={this._goBack}>
                            <Icon name={appDefaults.searchHeaderBackIcon} style={{color: colors.white}}/>
                        </Button>
                        <Title style={{alignSelf: 'center', paddingLeft: 5}}>{`${this.data.type}: ${this.data.name}`}</Title>
                    </Left>
                </Header>
                <RenderComponent data={this.data}/>
            </Container>
        );
    }
}