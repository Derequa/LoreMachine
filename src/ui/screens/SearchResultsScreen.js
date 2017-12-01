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
import SearchHeader from '../components/SearchHeader';
import { NavigationActions } from 'react-navigation';
import { searchAll } from '../../managers/RealmManager';
import { colors } from '../colors';
import { navToDataScreen } from '../components/data/DataComponentMapper';
import {
    appStyles,
    appDefaults
} from '../appStyles';
import {
    FlatList,
    Linking,
    StyleSheet,
    TouchableOpacity,
    Keyboard
} from 'react-native';


const styles = StyleSheet.create({
    mainContainer: { backgroundColor: colors.black },
    resultCardStyle: { backgroundColor: colors.greyDark },
    resultCardContainer: { height: 180 },
    resultTitleContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    resultCardTitleText: {
        color: colors.white,
        fontWeight: 'bold'
    },
    resultCardTypeText: {
        color: colors.greyLight,
        fontWeight: 'bold'
    },
    resultUrlText: {
        color: colors.tealLight,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    resultUrlIcon: {
        color: colors.tealLight,
        fontSize: 22
    },
    resultDescription: { color: colors.white },
    emptyContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.greyDark
    },
    emptyIcon: {
        fontSize: 170,
        color: colors.greyDark
    }
});

export default class SearchResultsScreen extends React.Component {


    static navigationOptions = { header: null };


    constructor(props) {
        super(props);
        const results = this.props.navigation.state.params.results;
        this.state = {
            query: this.props.navigation.state.params.query,
            searchResults: results ? ((results.length === 0) ? [{empty: true}] : results) : [{empty: true}],
            searchInput: false,
        }
    }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.searchResults !== prevState.searchResults) {
            setTimeout(this._scrollToTopHack, 17);
        }
    }


    _goBack = () => { this.props.navigation.dispatch(NavigationActions.back()) }


    _refreshData = async ({ query, results }) => {
        const q = query ? query : this.state.query;
        let r = results;

        if (!r) {
            r = await searchAll(q);
        }

        if (results.length < 1) {
            this.setState({searchResults: [{empty: true}], });
        }
        else {
            this.setState({searchResults: r, });        
        }
    }


    render() {
        const leftIcon = (
            <Button transparent onPress={this._goBack}>
                <Icon name={appDefaults.searchHeaderBackIcon} style={appStyles.searchHeaderBackButton}/>
            </Button>
        );

        return (
            <Container style={styles.mainContainer}>
                <SearchHeader
                leftIcon={leftIcon}
                headerStyle={appStyles.searchHeaderBackground}
                inputStyle={appStyles.searchInputStyle}
                androidStatusBarColor={appDefaults.searchHeaderBarColor}
                iosBarStyle={appDefaults.searchHeaderBarStyle}
                autoFocus={false}
                defaultValue={this.state.query}
                onSubmit={this._refreshData}
                clearOnSubmmit={false}
                onItemSelect={this._onItemSelect}
                />
                    <FlatList
                    ref={(list) => {this.listRef = list}}
                    data={this.state.searchResults}
                    extraData={this.state}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={this._getItemLayout}
                    />
            </Container>
        );
    }


    _renderItem = ({item}) => {
        if (item.empty)
            return this._renderEmpty();
        return (
            <TouchableOpacity onPress={() => {this._onItemSelect(item)}}>
            <Card style={styles.resultCardStyle} contentContainerStyle={styles.resultCardContainer}>
                <CardItem header style={styles.resultCardStyle}>
                    <Left style={styles.resultTitleContainer}>
                        <Text style={styles.resultCardTitleText}>{`${item.name}:`}</Text>    
                        <Text style={styles.resultCardTypeText}>{item.type}</Text>
                    </Left>
                    <Right>
                        {item.url  && (
                            <Button transparent onPress={() => {Linking.openURL(item.url)}}>
                                <Text style={styles.resultUrlText}> View on Wiki </Text>
                                <Icon active name={'open'} style={styles.resultUrlIcon}/>
                            </Button>
                        )}
                    </Right>
                </CardItem>
                <CardItem style={styles.resultCardStyle}>
                    <Body>
                        <Text style={styles.resultDescription} numberOfLines={3} >{item.description}</Text>
                    </Body>
                </CardItem>
            </Card>
            </TouchableOpacity>
        );
    }


    _renderEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>{`We got nothing...\nTry again?`}</Text>
                <Icon name='sad' style={styles.emptyIcon}/>
            </View>
        );
    }

    _keyExtractor= (item, index) => { return `${item.type}:${item.name}` }

    _getItemLayout = (data, index) => { return {offset: 180 * index, length: 180, index} }

    _scrollToTopHack = () => { this.listRef.scrollToIndex({animated: true, index: 0}) }

    _onItemSelect = (data) => {
        Keyboard.dismiss();
        navToDataScreen(this.props.navigation, data);
    }
}