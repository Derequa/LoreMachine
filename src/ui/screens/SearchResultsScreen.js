import React from 'react';
import {
    Container,
    Content,
    Header,
    Left,
    Right,
    Body,
    Icon,
    Button,
    Title,
    Text,
    View,
    Card,
    CardItem,
    List,
} from 'native-base';
import {
    FlatList,
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
    _goBack = async () => { this.props.navigation.dispatch(NavigationActions.back()) }


    // TODO: search is better but could still use work
    _refreshData = async (query) => {
        let q = (query !== undefined ? query : this.state.query);
        const results = await searchAll(q, max_results);
        console.log(results);
        
        if (results.length < 1) {
            this.setState({searchResults: [{empty: true}], query: q, });
            return;
        }
        this.setState({searchResults: results, query: q, });

        if (this.listRef) {
            this.listRef._root.scrollTo([0, 0]);
        }
    }


    _onBackPress = () => {
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
                    <Button transparent onPress={this._onBackPress}>
                        <Icon name='arrow-back' style={{alignSelf: 'center', color: colors.black}}/>
                    </Button>
                )}
                headerStyle={{backgroundColor: colors.transparent}}
                androidStatusBarColor={colors.black}
                iosBarStyle='light-content'
                autoFocus={false}
                defaultValue={this.state.query}
                onSubmit={this._refreshData}
                iconColor={colors.black}/>
                    <List
                    ref={(list) => {this.listRef = list}}
                    dataArray={this.state.searchResults}
                    renderRow={this._renderItem}/>
            </Container>
        );
    }


    _renderItem = (item) => {
        if (item.empty)
            return this._renderEmpty();
        return (
            <Card style={{backgroundColor: colors.greyDark}}>
                <CardItem header style={{backgroundColor: colors.greyDark}}>
                    <Left>
                        <Text style={{color: colors.white, fontWeight: 'bold'}}>{item.name}</Text>
                    </Left>
                    <Right>
                        <Text style={{color: colors.greyLight, fontWeight: 'bold'}}>{item.type}</Text>
                    </Right>
                </CardItem>
                <CardItem style={{backgroundColor: colors.greyDark}}>
                    <Body>
                        <Text style={{color: colors.white}} numberOfLines={3} >{item.description}</Text>
                    </Body>
                </CardItem>
                
                <CardItem footer style={{backgroundColor: colors.greyDark}}>
                    <Left>
                    {item.url  && (
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
                    )}
                    </Left>
                </CardItem>
            </Card>
        );
    }


    _renderEmpty = () => {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: colors.greyDark
                }}>
                {'We got nothing...'}
                </Text>
                <Text
                style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    color: colors.greyDark
                }}>
                {'Try again?'}
                </Text>
                <Icon 
                name='sad'
                style={{fontSize: 170, color: colors.greyDark}}/>
            </View>
        );
    }

}