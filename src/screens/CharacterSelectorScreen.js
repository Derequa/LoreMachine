import React from 'react';
import { 
    Container,
    Header,
    View, 
    DeckSwiper,
    Drawer,
    Card,
    CardItem,
    Thumbnail,
    Text,
    Title,
    Left,
    Body,
    Icon,
    Button,
} from 'native-base';
import { styles } from '../styles';
import { colors } from '../colors';
import RootSiblings from 'react-native-root-siblings';
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker';
import MainSideBar from './MainSideBar';
import {
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
} = MK;

const ColoredFab = MKButton.coloredFab()
  .withStyle(styles.fab)
  .build();

const img_width = (Dimensions.get('screen').width - 42);
const img_height = (Dimensions.get('screen').height - 170);

export default class CharacterSelectorScreen extends React.Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentWillMount() {
        this.fabRoot = new RootSiblings(
            <ColoredFab onPress={this._openFilePicker}style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 69, height: 69, position: 'absolute', bottom: 20, right: 20}}>
                <Icon name='add' size={40} color={colors.white}/>
            </ColoredFab>
        );
        this.setState({ data: this._loadCharacters()});
    }

    componentWillUnmount() {
        this.fabRoot.destroy();
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
            filetype: [DocumentPickerUtil.images()],
            },(error,res) => {
            // Android
            if (res) {
                console.log(
                res.uri,
                res.type, // mime type
                res.fileName,
                res.fileSize
                );
            }
          });
    }


    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<MainSideBar navigator={this.navigator} />}
            onClose={() => this._closeDrawer()}
            >
                <Container>
                <Header>
                    <Left style={{flex: 1, flexDirection: 'row'}}>
                        <Button transparent onPress={this._openDrawer}>
                            <Icon ios='ios-menu' android="md-menu"/>
                        </Button>
                        <Title style={{alignSelf: 'center', paddingLeft: 5}}>Select a Character</Title>
                    </Left>
                </Header>
                <View>
                    <DeckSwiper
                    dataSource={this.state.data}
                    renderItem={this._renderCard}
                    />
                </View>
                </Container>
            </Drawer>
          );
    }


    _renderCard(card) {
        return(
            <Card style={{ elevation: 3 }}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text>{card.name + ': Level ' + card.level}</Text>
                        <Text note>{card.race + ' ' + card.class}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image style={{ height: 400, flex: 1 }} source={card.image} resizeMode='cover'/>
                </CardItem>
            </Card>
        );
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