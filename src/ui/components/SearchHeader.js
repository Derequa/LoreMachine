import React from 'react';
import {
    Header,
    Item,
    Button,
    Icon,
    Input,
    Text,
    View,
} from 'native-base';
import { searchAll } from '../../managers/RealmManager';
import { navToDataScreen } from './data/DataComponentMapper';
import {
    Menu,
    MenuTrigger,
    MenuOptions,
    MenuOption,
    renderers
} from 'react-native-popup-menu';
import {
    Dimensions,
    StyleSheet
} from 'react-native';
import { colors } from '../colors';


const maxDisplayResults = 7;
const SCREEN_WIDTH = (Dimensions.get('screen').width);
const styles = StyleSheet.create({
    headerItem: { paddingLeft: 0 },
    iconColor: {
        paddingLeft: 0,
        alignSelf: 'center',
        color: colors.black
    },
    clearSearchButton: {
        alignSelf: 'center',
        paddingRight: 0
    },
    dropDownTitle: {
        color: colors.black,
        fontSize: 18
    },
    dropDownSubTitle: { color: colors.greyDark }
});


export default class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: this.props.defaultValue ? this.props.defaultValue : '',
            searchData: []
        }
    }

    componentWillUnmount() {
        this.menuRef.close();
    }

    
    render() {
        return(
            <View>
                <Header
                style={this.props.headerStyle}
                androidStatusBarColor={this.props.androidStatusBarColor}
                iosBarStyle={this.props.iosBarStyle}
                searchBar
                rounded
                >
                    <Item style={styles.headerItem}>
                        {this.props.leftIcon}
                        <Icon name='ios-search' style={styles.iconColor}/>
                        <Input 
                        ref={(search) => {this.searchRef = search}}
                        autoFocus={this.props.autoFocus !== undefined ? this.props.autoFocus : true}
                        style={this.props.inputStyle}
                        defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                        placeholder={'Search'}
                        onChangeText={this._changeText.bind(this)}
                        onSubmitEditing={this._onSubmit.bind(this)}
                        />
                        {this.state.searchText.length > 0 && (
                            <Button
                            transparent
                            style={styles.clearSearchButton}
                            onPress={this._clearSearch}>
                                <Icon name='close' style={styles.iconColor}/>
                            </Button>)}
                        {this.props.rightIcon}
                    </Item>
                </Header>
                <Menu 
                ref={(menu) => {this.menuRef = menu}}
                renderer={renderers.NotAnimatedContextMenu}
                >
                    <MenuTrigger/>
                    <MenuOptions customStyles={{optionsContainer: {width: SCREEN_WIDTH}}}>
                        {this._getMenuOptions()}
                    </MenuOptions>
                </Menu>
            </View>  
        );// TODO: Handle dropdown changes on screen rotation
    }

    _getMenuOptions = () => {
        let options = [];

        for (let i = 0 ; i < this.state.searchData.length && i < maxDisplayResults ; i++) {
            const name = this.state.searchData[i].name;
            const type = this.state.searchData[i].type;
            options.push((
                <MenuOption
                key={name} 
                onSelect={() => {
                    if (this.props.clearOnSubmmit) {
                        this.searchRef.setNativeProps({text: ''});
                    }
                    if (this.props.onItemSelect) {
                        this.props.onItemSelect(this.state.searchData[i])
                    }
                }}>
                    <Text style={styles.dropDownTitle}>{name}</Text>
                    <Text style={styles.dropDownSubTitle}>{type}</Text>
                </MenuOption>
            ));
        }
        return options;
    }
    
    _changeText = async (value) => {
        if (value.length > 0 && this.state.searchText.length === 0)
            this.menuRef.open();
        else if (value.length === 0)
            this.menuRef.close();
        else if (!this.menuRef._isOpen()) {
            this.menuRef.open();
        }

        if (this.props.onChangeText)
            this.props.onChangeText(value);

        const results = await searchAll(value);
        if (results.length === 0) {
            this.menuRef.close();
        }

        this.setState({searchText: value, searchData: results});
    }


    _clearSearch = () => {
        this.searchRef.setNativeProps({text: ''});
        if (this.props.onChangeText)
            this.props.onChangeText('');
        this.setState({searchData: []});
    }

    _onSubmit = () => {
        if (this.props.onSubmit)
            this.props.onSubmit({ query: this.state.searchText, results: this.state.searchData });
        this.menuRef.close();
        if (this.props.clearOnSubmmit) {
            this.searchRef.setNativeProps({text: ''});
        }
    }
}