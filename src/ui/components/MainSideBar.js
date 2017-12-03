import React from 'react';
import {
    Image,
    Dimensions,
    StyleSheet,
} from 'react-native';
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
} from 'native-base';
import {
    appDefaults,
    appStyles
} from '../appStyles';
import { colors } from '../colors';


const drawerItems = [
    {
        name: 'Browse',
        route: 'DataBrowser',
        icon: 'folder',
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
        name: 'Settings',
        route: 'NopeScreen',
        icon: 'settings',
        color: colors.greenPale
    },
];
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const coverImage = require('../../../assets/loremachine.png');
const styles = StyleSheet.create({
    menuImage: {
        resizeMode: 'contain',
        height: deviceHeight / 3.5,
        width: null,
        position: "relative",
        marginBottom: 10
    },
    menuContainer: {
        flex: 1,
        backgroundColor: colors.black,
        top: -1
    },
    iconStyle: {
        
    },
});

export default class MainSideBar extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Container>
                <Content bounces={false} style={styles.menuContainer}>
                    <Image source={coverImage} style={styles.menuImage}/>
                    <List dataArray={drawerItems} renderRow={this._renderItem}/>
                </Content>
            </Container>
        );
    }

    _renderItem = (item) => {
        return(
            <ListItem button onPress={() => {this._nav(item)}} style={appStyles.mainContainer}>
                <Left>
                    <Icon active name={item.icon} style={[styles.iconStyle, {color: item.color}]} />
                    <Text style={{color: item.color}}>
                        {item.name}
                    </Text>
                </Left>
            </ListItem>
        );
    }

    _nav = (item) => {
        if (this.props.closeSelf)
            this.props.closeSelf();
        this.props.navigation.navigate(item.route);
    }
}