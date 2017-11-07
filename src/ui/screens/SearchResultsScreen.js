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
    List,
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


    static navigationOptions = { header: null };


    constructor(props) {
        super(props);
        this.state = {
            query: this.props.navigation.state.params.query,
            searchResults: [],
            searchInput: false,
        }
    }


    componentDidMount() {
        this._refreshData();
    }


    // TODO: replace with menu?
    _goBack() { this.props.navigation.dispatch(NavigationActions.back()) }


    // TODO: search is better but could still use work
    _refreshData(query) {
        console.log('refreshing...');
        let q = (query !== undefined ? query : this.state.query);
        searchAll(q, max_results)
        .then(async (results) => {
            console.log(results);
            let newData = [];
            for (let i = 0 ; i < results.length ; i++) {
                console.log('Adding section: ' + results[i].display_name);
                newData.push({
                    section_title: results[i].display_name
                });
                for (let j = 0 ; j < results[i].data.length ; j++) {
                    console.log('Adding item: ' + results[i].data[j].name);
                    newData.push(results[i].data[j]);
                }
            }
            if (newData.length === 0) {
                newData.push({empty: true});
            }
            this.setState({searchResults: newData, query: q, });
        })
        .catch((err) => {console.error(err)});
        
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
                leftIcon={(
                    <Button transparent onPress={this._onBackPress.bind(this)}>
                        <Icon name='arrow-back' style={{alignSelf: 'center', color: colors.black}}/>
                    </Button>
                )}
                headerStyle={{backgroundColor: colors.transparent}}
                androidStatusBarColor={colors.black}
                iosBarStyle='light-content'
                autoFocus={false}
                defaultValue={this.state.query}
                onSubmit={this._refreshData.bind(this)}
                iconColor={colors.black}/>
                <View>
                    <List
                    dataArray={this.state.searchResults}
                    renderRow={this._renderItem.bind(this)}/>
                </View>
            </Container>
        );
    }


    _renderItem(item) {
        // Hack for shitty section support with native base
        if (item.empty)
            return this._renderEmpty();
        else if (item.section_title)
            return this._renderSection(item.section_title);
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


    _renderSection(title) {
        return (
            <Text style={{
                color: colors.greyDark,
                fontSize: 18,
                fontWeight: 'bold',
                alignSelf: 'flex-start',
                padding: 15,
            }}>{title}</Text>
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

}