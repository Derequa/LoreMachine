import React from 'react';
import Swiper from 'react-native-deck-swiper'
import { Card } from 'react-native-elements';
import { styles } from '../styles';
import { colors } from '../colors';
import RootSiblings from 'react-native-root-siblings';
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const MK = require('react-native-material-kit');

const {
  MKButton,
  MKColor,
} = MK;

const ColoredFab = MKButton.coloredFab()
  .withStyle(styles.fab)
  .build();

const SCREEN_WIDTH = 380;// Dimensions.get('screen').width;
const SCREEN_HEIGHT = 480;//Dimensions.get('screen').height;

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
            <ColoredFab style={{flex: 1, justifyContent: 'center', alignItems: 'center', width: 69, height: 69, position: 'absolute', bottom: 20, right: 20}}>
                <Icon name='add' size={40} color={colors.white}/>
            </ColoredFab>
        );
        this.setState({ data: this._loadCharacters()});
    }

    componentWillUnmount() {
        this.fabRoot.destroy();
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <Swiper
                    ref={(swiper) => { this.swiper = swiper }}
                    onSwiped={this._onSwipe}
                    cards={this.state.data}
                    renderCard={this._renderCard}
                    infinite={true}
                    backgroundColor={colors.lightGrey}
                    >
                </Swiper>
            </View>
        );
    }

    _renderCard(card) {
        return(
            <View style={styles.card}>
                <Image 
                    source={card.card_img}
                    style={{alignSelf: 'center', borderRadius: 4,  borderWidth: 2,}}
                    resizeMode='cover'
                />
            </View>
        );
        /*return(<Card
            key={card.id}
            containerStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.92, height: SCREEN_HEIGHT - 165}}
            featuredTitle={`${card.name}, ${card.class}`}
            featuredTitleStyle={{position: 'absolute', left: 15, bottom: 10, fontSize: 30 }}
            //image={card.card_img}
           // imageStyle={{borderRadius: 10, width: SCREEN_WIDTH * 0.915, height: SCREEN_HEIGHT - 165}}  
        />);*/
    }

    _renderEmpty() {
        <View style={styles.container}>
            <Text style={styles.welcome}>nope</Text>
        </View>
    }

    _onSwipe(card) {
        console.log('on swipe!');
    }


    _loadCharacters() {
        return(
            [
                {id: 0, name: 'Solaire', level: 10, class: 'Cleric', race: 'Human', card_img: require('../../assets/solaire.jpg')},
                {id: 1, name: 'Gimli', level: 7, class: 'Barbarian', race: 'Dwarf', card_img: require('../../assets/gimli.jpeg')},
                {id: 2, name: 'Vex', level: 6, class: 'Rogue', race: 'Human', card_img: require('../../assets/vex.png')},
                {id: 3, name: 'Daerak', level: 6, class: 'Paladin', race: 'Half-Elf', card_img: require('../../assets/daerak.jpg')}
            ]
        );
    }

}