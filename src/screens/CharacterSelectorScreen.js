import React from 'react';
import { styles } from '../styles';
import {
    Text,
    View,
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

export default class CharacterSelectorScreen extends React.Component {

    static navigationOptions = {
        title: 'Character Selection',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>
                    Welcome to React Native stupid!
                    </Text>
                    <Text style={styles.instructions}>
                    To get started, edit index.android.js
                    </Text>
                    <Text style={styles.instructions}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                    </Text>
                </View>
                <View style={{
                    position: 'absolute',
                    width: 100,
                    height: 100,
                    top: 510,
                    left: 320,
                }}>
                    <ColoredFab>
                        <Icon name='add' size={40} color='#FFFFFF'/>
                    </ColoredFab>
                </View>
            </View>
        );
    }

}