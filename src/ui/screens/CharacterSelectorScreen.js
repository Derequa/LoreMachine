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
import { styles } from '../styles';
import { colors } from '../colors';
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

export default class CharacterSelectorScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            renderMode: DECK_MODE,
            searching: false,
        }
    }

    componentWillMount() {
        this.setState({ data: this._loadCharacters()});
        SettingsManager.get().then((settings) => {this.setState({renderMode: settings.selectorMode})});
        this._newCharacterPopupRoot = new RootSiblings(
            <NewCharacterPopup ref={(popup) => { this._newCharacterPopupRef = popup; }} navigation={this.props.navigation}/>
        );
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        console.log('unmounting...');
        if (this._newCharacterPopupRoot)
            this._newCharacterPopupRoot.destroy();
        
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidHide = () => {
        if (this.state.searching){
            this._onSearchCancel();
        }
    }


    _closeDrawer = () => { this.drawer._root.close() };


    _openDrawer = () => { this.drawer._root.open() };


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


    _onSearchStart = () => {
        this.setState({ searching: true });
    }


    _onSearchCancel = () => {
        this.setState({ searching: false });
    }


    _onSearchSubmit = ({query, results}) => {
        this.props.navigation.navigate('SearchResults', {query, results});
    }


    // TODO: clean up, particularly inline anon callbacks
    // Also add in drop down thingy for search, probably should put that in the search header component...
    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<MainSideBar navigator={this.navigator} navigation={this.props.navigation}/>}
            onClose={() => this._closeDrawer()}
            >
                <Container style={{backgroundColor: colors.black}}>
                <Fab style={{ backgroundColor: colors.orangeLight }} position='bottomRight' onPress={() => { this._newCharacterPopupRef.show() }}>
                    <Icon name='add'/>
                </Fab>
                    <SearchHeader
                    leftIcon={(
                        <Button transparent onPress={this._openDrawer} style={{alignSelf: 'center'}}>
                            <Icon ios='ios-menu' android='md-menu' style={{color: colors.black}}/>
                        </Button>
                    )}
                    headerStyle={{backgroundColor: colors.transparent}}
                    androidStatusBarColor={colors.black}
                    autoFocus={false}
                    inputStyle={{alignSelf: 'center', justifyContent: 'center'}}
                    iosBarStyle='light-content'
                    onSubmit={this._onSearchSubmit}
                    iconColor={colors.black}
                    rightIcon={(
                        <Button transparent onPress={this._changeRenderMode} style={{alignSelf: 'center', paddingRight: 0}}>
                            <Icon active name={(this.state.renderMode === LIST_MODE) ? 'list' : 'albums'} style={{ color: colors.black, fontSize: 26, width: 30 }}/>
                        </Button>
                    )}/>
                    <View>
                        {(this.state.renderMode === DECK_MODE) ? this._renderDeck() : this._renderList()}
                    </View>
                </Container>
            </Drawer>
        );
    }


    _renderDeck = () => {
        return(
            <DeckSwiper
            dataSource={this.state.data}
            renderItem={this._renderCard}
            />
        );
    }


    _renderList = () => {
        return (
            <List
            dataArray={this.state.data}
            renderRow={this._renderListItem}
            />
        );
    }


    _renderCard = (card) => {
        return(
            <Card style={{ elevation: 3, padding: 5, backgroundColor: colors.greyDark}}>
                <CardItem style={{backgroundColor: colors.greyDark}}>
                    <Left>
                        <Body>
                            <Text style={{color: colors.white}}>{card.name + ': Level ' + card.level}</Text>
                            <Text style={{color: colors.white}} note>{card.race + ' ' + card.clazz}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{ height: (Dimensions.get('window').height) - 220, flex: 1 }} source={card.image} resizeMode='cover'/>
                </CardItem>
            </Card>
        );
    }


    _renderListItem = (item) => {
        return(
            <ListItem style={{backgroundColor: colors.black}}>
                <Body style={{flex: 1, flexDirection: 'row'}}>
                    <Thumbnail size={80} source={item.image} />
                    <View style={{ padding: 10}}>
                        <Text style={{color: colors.white}}>{item.name + ': Level ' + item.level}</Text>
                        <Text style={{color: colors.white}} note>{item.race + ' ' + item.clazz}</Text>
                    </View>
                </Body>
            </ListItem>);
    }


    _loadCharacters = () => {
        return dummy_characters;
    }

}
