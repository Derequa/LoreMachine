import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const appDefaults = {
    searchHeaderBackIcon: 'arrow-back',
    searchHeaderBarColor: colors.black,
    searchHeaderBarStyle: 'light-content',
}

export const appStyles = StyleSheet.create({
    mainContainer: { backgroundColor: colors.black },
    searchHeaderBackButton: {
        alignSelf: 'center', 
        color: colors.black
    },
    searchInputStyle: {
        alignSelf: 'center',
        justifyContent: 'center'
    },
    searchHeaderBackground: { backgroundColor: colors.transparent },
});