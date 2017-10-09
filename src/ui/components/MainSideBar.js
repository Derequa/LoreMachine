import React from 'react';
import { Image, Switch, Dimensions } from "react-native";
import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
    Left,
    Body,
	Right,
	Badge,
	Button,
	View,
    variables,
} from "native-base";
import { colors } from '../colors';
const drawerItems = [
    {
        name: 'boi',
        route: '',
        icon: 'add',
        color: colors.whitePale
    },
    {
        name: 'i',
        route: '',
        icon: 'add',
        color: colors.orangeLight
    },
    {
        name: 'am',
        route: '',
        icon: 'add',
        color: colors.burgandy
    },
    {
        name: 'sad...',
        route: '',
        icon: 'add',
        color: colors.greenPale
    },
];
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const coverImage = require('../../../assets/yeet.jpg');

export default class MainSideBar extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: colors.white, top: -1 }}>
                    <Image source={coverImage} style={{
                        alignSelf: "stretch",
                        height: deviceHeight / 3.5,
                        width: null,
                        position: "relative",
                        marginBottom: 10
                    }}/>
                    <List>
                    </List>
                </Content>
            </Container>
        );
    }

    nothing() {}
}