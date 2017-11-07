import React from 'react';
import {
    View,
    Button,
    Icon,
    Text,
} from 'native-base';
import { ActivityIndicator } from 'react-native';
import PopupDialog, { DialogTitle } from 'react-native-popup-dialog';
import { colors } from '../colors';


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
                    <ActivityIndicator size='large' color={colors.white}/>
                </View>
            </PopupDialog>
        );
    }
}