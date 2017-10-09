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
} from "native-base";
import { colors } from '../colors';
const drawerItems = [
    {
        name: 'Settings',
        route: 'NopeScreen',
        icon: 'settings',
        color: colors.whitePale
    },
    {
        name: 'stuff 2',
        route: 'NopeScreen',
        icon: 'add',
        color: colors.orangeLight
    },
    {
        name: 'stuff 3',
        route: 'NopeScreen',
        icon: 'add',
        color: colors.burgandy
    },
    {
        name: 'stuff 4',
        route: 'NopeScreen',
        icon: 'add',
        color: colors.greenPale
    },
];
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const coverImage = require('../../../assets/loremachine.png');

export default class MainSideBar extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Content bounces={false} style={{ flex: 1, backgroundColor: colors.black, top: -1 }}>
                    <Image source={coverImage} style={{
                        resizeMode: 'contain',
                        height: deviceHeight / 3.5,
                        width: null,
                        position: "relative",
                        marginBottom: 10
                    }}/>
                    <List dataArray={drawerItems} renderRow={this._renderItem.bind(this)}/>
                </Content>
            </Container>
        );
    }

    _renderItem(item) {
        return(
            <ListItem button onPress={() => {this.props.navigation.navigate(item.route)}} style={{backgroundColor: colors.black}}>
                <Left>
                    <Icon active name={item.icon} style={{ color: item.color, fontSize: 26, width: 30 }} />
                    <Text style={{color: item.color}}>
                        {item.name}
                    </Text>
                </Left>
            </ListItem>
        );
    }

    nothing() {}
}