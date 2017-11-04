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
import { NavigationActions } from 'react-navigation';
import { searchAll } from '../../managers/RealmManager';
import { colors } from '../colors';
import { Linking } from 'react-native';

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
        }
    }

    componentDidMount() {
        this._refreshData();
    }

    // TODO replace with menu?
    _goBack() { this.props.navigation.dispatch(NavigationActions.back()) }

    async _refreshData() {
        console.log('refreshing...');
        let results = await searchAll(this.state.query);
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
        this.setState({searchResults: newData, refreshing: false});
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <Button transparent onPress={this._goBack.bind(this)}>
                            <Icon name='arrow-back'/>
                        </Button>
                        <Title style={{alignSelf: 'center', paddingLeft: 10,}}>Search Results</Title>
                    </Left>
                </Header>
                <Content>
                    <SectionList
                    sections={this.state.searchResults}
                    refreshing={this.state.refreshing}
                    renderItem={this._renderItem}
                    renderSectionHeader={this._renderSection}
                    onRefresh={this._refreshData.bind(this)}
                    keyExtractor={this._keyExtractor}/>
                </Content>
            </Container>
        );
    }

    _renderItem({item}) {
        return (
            <Card>
                <CardItem header>
                    <Left>
                        <Text style={{color: colors.greyDark, fontWeight: 'bold'}}>{item.name}</Text>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <Text numberOfLines={3} >{item.description}</Text>
                    </Body>
                </CardItem>
                {item.url  && (
                <CardItem footer>
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

    _keyExtractor(item) {
        return item.name;
    }

}