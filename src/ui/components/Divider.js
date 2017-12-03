import React from 'react';
import { View } from 'native-base';
import { colors } from '../colors';

export default class Divider extends React.Component {

    constructor(props) { super(props) }

    render() {
        const thickness = this.props.thickness || 1;
        const color = this.props.color || colors.white;
        const width = this.props.width || 400;
        return (
            <View
            style={{
              borderBottomWidth: thickness,
              borderBottomColor: color,
              width: width,
            }}/>
        );
    }
}