import React from 'react';
import {
    Header,
    Item,
    Button,
    Icon,
    Input,
} from 'native-base';


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
        onBackPress
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
                    <Button transparent onPress={this.props.onBackPress}>
                        <Icon name='arrow-back' style={{alignSelf: 'center', color: this.props.iconColor}}/>
                    </Button>
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