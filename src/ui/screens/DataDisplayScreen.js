import React from 'react';
import {
    Container,
    Header,
    Left,
    Title,
    Button,
    Icon
} from 'native-base';
import { dataMap } from '../components/data/DataComponentMapper';
import TitleHeader from '../components/TitleHeader';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';

export default class DataDisplayScreen extends React.Component {

    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.data = props.navigation.state.params.data;
    }

    

    render() {
        const RenderComponent = dataMap[this.data.object_name];

        if (!RenderComponent)
            return null;
        
        return (
            <Container style={appStyles.mainContainer}>
                <TitleHeader
                title={`${this.data.type}: ${this.data.name}`}
                navigation={this.props.navigation}
                />
                <RenderComponent data={this.data}/>
            </Container>
        );
    }
}