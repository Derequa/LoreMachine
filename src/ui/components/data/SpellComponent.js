import React from 'react';
import {
    Content,
    View,
    Text,
    Title,
} from 'native-base';
import {
    StyleSheet
} from 'react-native';
import {
    appDefaults,
    appStyles
} from '../../appStyles';
import { colors } from '../../colors';
import Divider from '../Divider';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});
export default class SpellComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content contentContainerStyle={styles.container}>
                <Title>{`${this.props.data.name}`}</Title>
                <Divider/>
                <Text style={appStyles.text}>{`\n${this.props.data.description}`}</Text>
            </Content>
        );
    }
}