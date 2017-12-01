import React from 'react';
import {
    Content,
    Text,
    Title,
    Button,
    Icon
} from 'native-base';
import {
    Linking,
    StyleSheet
} from 'react-native';
import { colors } from '../../colors';

const styles = StyleSheet.create({
    urlText: {
        color: colors.tealLight,
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    urlIcon: {
        color: colors.tealLight,
        fontSize: 22
    },
    text: {color: colors.white},
});

export default class BasicItem extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                <Title style={styles.text}>{`${this.props.data.name}`}</Title>
                <Text style={styles.text}>{`${this.props.data.description}`}</Text>
                {this.props.data.url &&
                <Button transparent onPress={this._openLink}>
                    <Text style={styles.urlText}>See More on Wiki</Text>
                    <Icon active name={'open'} style={styles.urlIcon}/>
                </Button>}
            </Content>
        );
    }

    _openLink = () => { Linking.openURL(this.props.data.url) }
}