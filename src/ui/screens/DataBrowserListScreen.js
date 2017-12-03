import React from 'react';
import {
    Container,
    Content,
    Header,
    Left, Right, Body,
    View,
    Text,
    List,
    ListItem
} from 'native-base';
import {
    StyleSheet,
} from 'react-native';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';
import { navToDataScreen } from '../components/data/DataComponentMapper';
import TitleHeader from '../components/TitleHeader';

const styles = StyleSheet.create({
});

export default class DataBrowserListScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.data = props.navigation.state.params.data;
        this.title = props.navigation.state.params.title;
    }

    render() {
        return (
            <Container style={appStyles.mainContainer}>
                <TitleHeader title={this.title} navigation={this.props.navigation}/>
                <List dataArray={this.data} renderRow={this._renderItem}/>
            </Container>
        );
    }

    _renderItem = (item) => {
        return (
            <ListItem style={appStyles.mainContainer} button onPress={() => { navToDataScreen(this.props.navigation, item) }}>
                <Left>
                    <Text style={appStyles.text}>{item.name}</Text>
                </Left>
            </ListItem>
        );
    }
}