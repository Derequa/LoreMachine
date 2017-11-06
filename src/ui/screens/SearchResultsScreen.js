import React from 'react';
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Icon,
    Button,
    Title,
    Text,
    ListItem,
    View,
    Card,
    CardItem,
} from 'native-base';
import {
    SectionList,
} from 'react-native';
import SearchHeader from '../components/SearchHeader';
import { NavigationActions } from 'react-navigation';
import { searchAll } from '../../managers/RealmManager';
import { colors } from '../colors';
import { Linking } from 'react-native';
var Promise = require('bluebird');

Promise.config({
    // Enable warnings
    warnings: true,
    // Enable long stack traces
    longStackTraces: true,
    // Enable cancellation
    cancellation: true,
    // Enable monitoring
    monitoring: false
});
const max_results = 100;

export default class SearchResultsScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            query: this.props.navigation.state.params.query,
            searchResults: [],
            refreshing: true,
            searchInput: false,
        }
    }

    componentDidMount() {
        this._refreshData();
    }

    // TODO: replace with menu?
    _goBack() { this.props.navigation.dispatch(NavigationActions.back()) }

    // TODO: fix slow search
    async _refreshData(query) {
        console.log('refreshing...');
        let q = (query !== undefined ? query : this.state.query);
        let results = await searchAll(q, max_results);
        console.log(results);
        let newData = [];
        for (let i = 0 ; i < results.length ; i++) {
            let section = {
                title: results[i].display_name,
                data: [],
            }
            for (let j = 0 ; j < results[i].data.length ; j++) {
                section.data.push({
                    name: results[i].data[j].name,
                    description: results[i].data[j].description,
                    url: results[i].data[j].url
                });
            }
            newData.push(section);
        }
        this.setState({searchResults: newData, refreshing: false, query: q });
    }

    // TODO: fix slow search, for real
    _onNewSearch(text) {
        this.setState({ query: text, refreshing: true }, this._refreshData.bind(this, text));
    }

    _onBackPress() {
        if (!this.state.searchInput) {
            this._goBack();
        }
        else {
            this.setState({ searchInput: false });
        }
    }

    render() {
        return (
            <Container style={{backgroundColor: colors.black}}>
                <SearchHeader
                onBackPress={this._onBackPress.bind(this)}
                headerStyle={{backgroundColor: colors.transparent}}
                androidStatusBarColor={colors.black}
                iosBarStyle='light-content'
                autoFocus={false}
                defaultValue={this.state.query}
                onSubmit={this._onNewSearch.bind(this)}
                iconColor={colors.black}/>
                <Content>
                    <SectionList
                    sections={this.state.searchResults}
                    refreshing={this.state.refreshing}
                    renderItem={this._renderItem}
                    ListEmptyComponent={this._renderEmpty}
                    renderSectionHeader={this._renderSection}
                    onRefresh={this._refreshData.bind(this)}
                    keyExtractor={this._keyExtractor}/>
                </Content>
            </Container>
        );
    }

    _renderItem({item}) {
        return (
            <Card style={{backgroundColor: colors.greyDark}}>
                <CardItem header style={{backgroundColor: colors.greyDark}}>
                    <Left>
                        <Text style={{color: colors.white, fontWeight: 'bold'}}>{item.name}</Text>
                    </Left>
                </CardItem>
                <CardItem style={{backgroundColor: colors.greyDark}}>
                    <Body>
                        <Text style={{color: colors.white}} numberOfLines={3} >{item.description}</Text>
                    </Body>
                </CardItem>
                {item.url  && (
                <CardItem footer style={{backgroundColor: colors.greyDark}}>
                    <Left>
                        <Button transparent onPress={() => {Linking.openURL(item.url)}}>
                            <Text 
                            style={{
                                color: colors.tealLight,
                                fontWeight: 'bold',
                                textDecorationLine: 'underline'
                            }}>
                            Wiki Page
                            </Text>
                        </Button>
                    </Left>
                </CardItem>
                )}
            </Card>
        );
    }

    _renderSection({section}) {
        return (
            <Text style={{
                color: colors.greyDark,
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                padding: 15,
            }}>{section.title}</Text>
        );
    }

    _renderEmpty() {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: colors.greyDark
                }}>
                {"We got nothing..."}
                </Text>
                <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: colors.greyDark
                }}>
                {"Try again?"}
                </Text>
                <Icon 
                name='sad'
                style={{fontSize: 170, color: colors.greyDark}}/>
            </View>
        );
    }

    _keyExtractor(item) {
        return item.name;
    }

}