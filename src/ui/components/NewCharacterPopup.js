import React from 'react';
import {
    View,
    Button,
    Icon,
    Text,
} from 'native-base';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { colors } from '../colors';
import { NavigationActions } from 'react-navigation';


export default class NewCharacterPopup extends React.Component {
     
    constructor(props) {
        super(props);
    }

    show() {
        if (this.popupRef)
            this.popupRef.show();
    }

    dismiss() {
        if (this.popupRef)
            this.popupRef.dismiss();
    }

    render() {
        return(
            <PopupDialog
            dialogStyle={{backgroundColor: colors.black}}
            width={280}
            ref={(popupRef) => { this.popupRef = popupRef; }}
            >
                <View style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
                    <Text style={{color: colors.white, alignSelf: 'center', fontWeight: 'bold', fontSize: 25, paddingBottom: 15, paddingHorizontal: 25}}>NEW CHARACTER</Text>
                    <Button full iconRight dark style={{justifyContent: 'space-between'}} onPress={() => {  this.dismiss(); this.props.navigation.navigate('NopeScreen'); }}>
                        <Text style={{paddingLeft: 25}}>Empty Character Sheet</Text>
                        <Icon name='arrow-forward' style={{paddingRight: 25}}/>
                    </Button>
                    <Button full iconRight dark style={{justifyContent: 'space-between'}} onPress={() => {  this.dismiss(); this.props.navigation.navigate('NopeScreen'); }}>
                        <Text style={{paddingLeft: 25}}>Character Assistant</Text>
                        <Icon name='arrow-forward' style={{paddingRight: 25}}/>
                    </Button>
                    <Button full iconRight dark style={{justifyContent: 'space-between'}} onPress={() => {  this.dismiss(); this.props.navigation.navigate('NopeScreen'); }}>
                        <Text style={{paddingLeft: 25}}>Import File</Text>
                        <Icon name='download' style={{paddingRight: 25}}/>
                    </Button>
                    <Button full iconRight dark onPress={this.dismiss.bind(this)} style={{justifyContent: 'space-between'}}>
                        <Text style={{paddingLeft: 25}}>Cancel</Text>
                        <Icon name='arrow-back' style={{paddingRight: 25}}/>
                    </Button>
                </View>
            </PopupDialog>
        );
    }
}