import React from 'react';
import { 
    Container,
    Header,
    Footer,
    Content,
    View, 
    DeckSwiper,
    Drawer,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Title,
    Left,
    Right,
    Body,
    Icon,
    Button,
    Fab,
    List,
    ListItem,
    Item,
    Input,
} from 'native-base';
import {
    appStyles,
    appDefaults
} from '../appStyles';
import { colors } from '../colors';
import { navToDataScreen } from '../components/data/DataComponentMapper';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MainSideBar from '../components/MainSideBar';
import NewCharacterPopup from '../components/NewCharacterPopup';
import RootSiblings from 'react-native-root-siblings';
import SearchHeader from '../components/SearchHeader';
import {
    Dimensions,
    Image,
    Keyboard,
    BackHandler,
    StyleSheet,
} from 'react-native';
import SettingsManager, { DECK_MODE, LIST_MODE } from '../../managers/SettingsManager';


const SCREEN_WIDTH = (Dimensions.get('screen').width);
const SCREEN_HEIGHT = (Dimensions.get('screen').height);
const dummy_characters =
[
    {id: 0, name: 'Solaire', level: 10, clazz: 'Cleric', race: 'Human', image: require('../../../assets/solaire.jpg')},
    {id: 1, name: 'Gimli', level: 7, clazz: 'Barbarian', race: 'Dwarf', image: require('../../../assets/gimli.jpeg')},
    {id: 2, name: 'Vex', level: 6, clazz: 'Rogue', race: 'Human', image: require('../../../assets/vex.png')},
    {id: 3, name: 'Daerak', level: 6, clazz: 'Paladin', race: 'Half-Elf', image: require('../../../assets/daerak.jpg')}
];
const styles = StyleSheet.create({
    mainContainer: { backgroundColor: colors.black },
    fab: { backgroundColor: colors.orangeLight },
    drawerButton: {alignSelf: 'center'},
    drawerIcon: {color: colors.black},
    renderModeButton: {
        alignSelf: 'center',
        paddingRight: 0
    },
    renderModeIcon: {
        color: colors.black,
        fontSize: 26,
        width: 30
    },
    cardContainer: {
        elevation: 3,
        padding: 5,
        backgroundColor: colors.greyDark
    },
    cardItem: { backgroundColor: colors.greyDark },
    textColor: { color: colors.white },
    cardImage: {
        height: (Dimensions.get('window').height) - 220,
        flex: 1
    },
    listItemContainer: { backgroundColor: colors.black },
    listItemBody: {
        flex: 1,
        flexDirection: 'row'
    },
    listItemTextContainer: { padding: 10 },
});


export default class CharacterSelectorScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            renderMode: DECK_MODE,
        }
    }

    componentWillMount() {
        this.setState({ data: this._loadCharacters()});
        SettingsManager.get().then((settings) => {this.setState({renderMode: settings.selectorMode})});
        this._newCharacterPopupRoot = new RootSiblings(
            <NewCharacterPopup ref={(popup) => { this._newCharacterPopupRef = popup; }} navigation={this.props.navigation}/>
        );
    }

    componentWillUnmount() {
        console.log('unmounting...');
        if (this._newCharacterPopupRoot)
            this._newCharacterPopupRoot.destroy();
        
        this.keyboardDidHideListener.remove();
    }


    _closeDrawer = () => { this.drawer._root.close() };
    _openDrawer = () => { this.drawer._root.open() };
    _onSearchSubmit = ({query, results}) => { this.props.navigation.navigate('SearchResults', {query, results}) }
    _onItemSelect = (data) => {
        Keyboard.dismiss();
        navToDataScreen(this.props.navigation, data);
    }

    _changeRenderMode = () => {
        console.log('changing mode...');
        let lastMode = this.state.renderMode;

        this.setState({
            renderMode: ((lastMode === DECK_MODE) ? LIST_MODE : DECK_MODE)
        });

        SettingsManager.get()
        .then((settings) => {
            settings.change({selectorMode: this.state.renderMode});
            return null;
        });
    }


    // TODO: clean up, particularly inline anon callbacks
    // Also add in drop down thingy for search, probably should put that in the search header component...
    render() {
        const leftIcon = (
            <Button transparent onPress={this._openDrawer} style={styles.drawerButton}>
                <Icon ios='ios-menu' android='md-menu' style={styles.drawerIcon}/>
            </Button>
        );

        const rightIcon = (
            <Button transparent onPress={this._changeRenderMode} style={styles.renderModeButton}>
                <Icon active name={(this.state.renderMode === LIST_MODE) ? 'list' : 'albums'} style={styles.renderModeIcon}/>
            </Button>
        );

        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<MainSideBar navigator={this.navigator} navigation={this.props.navigation}/>}
            onClose={() => this._closeDrawer()}
            >
                <Container style={styles.mainContainer}>
                <Fab style={styles.fab} position='bottomRight' onPress={() => { this._newCharacterPopupRef.show() }}>
                    <Icon name='add'/>
                </Fab>
                    <SearchHeader
                    leftIcon={leftIcon}
                    headerStyle={appStyles.searchHeaderBackground}
                    androidStatusBarColor={appDefaults.searchHeaderBarColor}
                    autoFocus={false}
                    inputStyle={appStyles.searchInputStyle}
                    iosBarStyle={appDefaults.searchHeaderBarStyle}
                    onSubmit={this._onSearchSubmit}
                    clearOnSubmmit={true}
                    rightIcon={rightIcon}
                    onItemSelect={this._onItemSelect}
                    />
                    <View>
                        {(this.state.renderMode === DECK_MODE) ? this._renderDeck() : this._renderList()}
                    </View>
                </Container>
            </Drawer>
        );
    }


    _renderDeck = () => { return (<DeckSwiper dataSource={this.state.data} renderItem={this._renderCard}/>) }
    _renderList = () => { return (<List dataArray={this.state.data} renderRow={this._renderListItem}/>) }


    _renderCard = (item) => {
        return(
            <Card style={styles.cardContainer}>
                <CardItem style={styles.cardItem}>
                    <Left>
                        <Body>
                            <Text style={styles.textColor}>{`${item.name}: Level ${item.level}`}</Text>
                            <Text style={styles.textColor} note>{`${item.race} ${item.clazz}`}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={styles.cardImage} source={item.image} resizeMode='cover'/>
                </CardItem>
            </Card>
        );
    }


    _renderListItem = (item) => {
        return(
            <ListItem style={styles.listItemContainer}>
                <Body style={styles.listItemBody}>
                    <Thumbnail size={80} source={item.image} />
                    <View style={styles.listItemTextContainer}>
                        <Text style={styles.textColor}>{`${item.name}: Level ${item.level}`}</Text>
                        <Text style={styles.textColor} note>{`${item.race} ${item.clazz}`}</Text>
                    </View>
                </Body>
            </ListItem>);
    }


    _loadCharacters = () => { return dummy_characters }

}
