import React from 'react';
import { 
    Container,
    Header,
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
} from 'native-base';
import { styles } from '../styles';
import { colors } from '../colors';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MainSideBar from './MainSideBar';
import {
    Dimensions,
    Image,
} from 'react-native';

const SCREEN_WIDTH = (Dimensions.get('screen').width);
const SCREEN_HEIGHT = (Dimensions.get('screen').height);
const DECK_MODE = 'deck-mode';
const LIST_MODE = 'list-mode';

export default class CharacterSelectorScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            active: false,
            renderMode: DECK_MODE,
        }
    }

    componentWillMount() {
        this.setState({ data: this._loadCharacters()});
    }

    componentWillUnmount() {
    }

    _closeDrawer = () => {
        this.drawer._root.close()
    };

    _openDrawer = () => {
        this.drawer._root.open()
    };

    _openFilePicker() {
        console.log('fab pressed you fucker');
        DocumentPicker.show({
            filetype: [DocumentPickerUtil.allFiles()],
            },(error,res) => {
            // Android
            var RNGRP = require('react-native-get-real-path');
            var RNFS = require('react-native-fs');
            RNGRP.getRealPathFromURI(res.uri)
                .then((filePath) => {
                    console.log(filePath);
                    RNFS.readFile(filePath)
                    .then((res) => {
                        let daerak = JSON.parse(res);
                        console.log(daerak);
                    })
                    
                    if (res) {
                        console.log(
                        res.uri,
                        res.type, // mime type
                        res.fileName,
                        res.fileSize
                        );
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
          });
    }

    _changeRenderMode() {
        let lastMode = this.state.renderMode;
        this.setState({
            renderMode: ((lastMode === DECK_MODE) ? LIST_MODE : DECK_MODE)
        });
    }


    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<MainSideBar navigator={this.navigator} />}
            onClose={() => this._closeDrawer()}
            >
                <Container style={{backgroundColor: colors.black}}>
                    <Header style={{backgroundColor: colors.greyDark}}>
                        <Left style={{flex: 1, flexDirection: 'row'}}>
                            <Button transparent onPress={this._openDrawer}>
                                <Icon ios='ios-menu' android="md-menu"/>
                            </Button>
                            <Title style={{alignSelf: 'center', paddingLeft: 5}}>Select a Character</Title>
                        </Left>
                        <Right>
                            <Button transparent onPress={this._changeRenderMode.bind(this)}>
                                <Icon name={(this.state.renderMode === LIST_MODE) ? 'albums' : 'list'}/>
                            </Button>
                        </Right>
                    </Header>
                        {(this.state.renderMode === DECK_MODE) ? this._renderDeck() : this._renderList()}
                </Container>
            </Drawer>
        );
        /*
        <
        */
    }

    _renderDeck() {
        return(
            <View>
                <DeckSwiper
                dataSource={this.state.data}
                renderItem={this._renderCard}
                />
            </View>
        );
    }

    _renderList() {
        return(
            <Content>
                <List
                dataArray={this.state.data}
                renderRow={this._renderListItem}
                />
            </Content>);
    }


    _renderCard(card) {
        return(
            <Card style={{ elevation: 3, padding: 5, backgroundColor: colors.greyDark}}>
                <CardItem style={{backgroundColor: colors.greyDark}}>
                    <Left>
                        <Body>
                            <Text style={{color: colors.white}}>{card.name + ': Level ' + card.level}</Text>
                            <Text style={{color: colors.white}} note>{card.race + ' ' + card.class}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{ height: (Dimensions.get('window').height) - 180, flex: 1 }} source={card.image} resizeMode='cover'/>
                </CardItem>
            </Card>
        );
    }

    _renderListItem(item) {
        return(
            <ListItem avatar style={{backgroundColor: colors.black}}>
                <Left>
                    <Thumbnail size={80} source={item.image} />
                </Left>
                <Body>
                    <Text style={{color: colors.white}}>{item.name + ': Level ' + item.level}</Text>
                    <Text style={{color: colors.white}} note>{item.race + ' ' + item.class}</Text>
                </Body>
            </ListItem>);
    }


    _loadCharacters() {
        return(
            [
                {id: 0, name: 'Solaire', level: 10, class: 'Cleric', race: 'Human', image: require('../../assets/solaire.jpg')},
                {id: 1, name: 'Gimli', level: 7, class: 'Barbarian', race: 'Dwarf', image: require('../../assets/gimli.jpeg')},
                {id: 2, name: 'Vex', level: 6, class: 'Rogue', race: 'Human', image: require('../../assets/vex.png')},
                {id: 3, name: 'Daerak', level: 6, class: 'Paladin', race: 'Half-Elf', image: require('../../assets/daerak.jpg')}
            ]
        );
    }

}