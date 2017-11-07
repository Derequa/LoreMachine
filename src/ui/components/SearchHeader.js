import React from 'react';
import {
    Header,
    Item,
    Button,
    Icon,
    Input,
} from 'native-base';
import ModalDropdown from 'react-native-modal-dropdown';


const dumb_data =
[
    'first thing',
    'second thing',
    'third thing',
    'last thing'
]

export default class SearchHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
        }
    }


    /*
        Props and shit
        
        headerStyle
        androidStatusBarColor
        iosBarStyle
        onSubmit
        iconColor
        inputStyle
        onChangeText
        leftIcon
        autoFocus
        defaultValue
    */

    
    render() {
        return(
            <Header
            style={this.props.headerStyle}
            androidStatusBarColor={this.props.androidStatusBarColor}
            iosBarStyle={this.props.iosBarStyle}
            searchBar
            rounded>
                <Item style={{paddingLeft: 0}}>
                    {this.props.leftIcon}
                    <Icon name='ios-search' style={{paddingLeft: 0, alignSelf: 'center', color: this.props.iconColor}}/>
                    <Input 
                    ref={(search) => {this.searchRef = search}}
                    autoFocus={this.props.autoFocus !== undefined ? this.props.autoFocus : true}
                    style={this.props.inputStyle}
                    defaultValue={this.props.defaultValue ? this.props.defaultValue : ''}
                    placeholder={'Search'}
                    onChangeText={this._changeText.bind(this)}
                    onSubmitEditing={this._onSubmit.bind(this)}/>
                    {this.state.searchText.length > 0 && (
                        <Button
                        transparent
                        style={{alignSelf: 'center'}}
                        onPress={this._clearSearch.bind(this)}>
                            <Icon name='close' style={{color: this.props.iconColor}}/>
                        </Button>)}
                </Item>
            </Header>
        );
    }

    
    _changeText(value) {
        if (value.length > 0 && this.state.searchText.length === 0)
            this.dropDown.show();
        else if (value.length === 0)
            this.dropDown.hide();
        
        this.setState({searchText: value});
        if (this.props.onChangeText)
            this.props.onChangeText(value);
    }


    _clearSearch() {
        this.searchRef.setNativeProps({text: ''});
        if (this.props.onChangeText)
            this.props.onChangeText('');
    }

    _onSubmit() {
        if (this.props.onSubmit)
            this.props.onSubmit(this.state.searchText);
    }
}