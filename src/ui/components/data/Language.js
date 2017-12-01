import React from 'react';
import {
    Content,
    Text
} from 'native-base';
import { colors } from '../../colors';

export default class Language extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Content>
                <Text style={{color: colors.white}}>{`${this.props.data.name}\n${this.props.data.description}`}</Text>
            </Content>
        );
    }
}