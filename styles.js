import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
    title : {
        fontSize    : 17,
        color       : '#000000',
    },
    textField : {
        height              : 44,
        backgroundColor     : 'transparent',
        fontSize            : 18,
        padding             : 10,
        textAlignVertical   : 'top',
        width: '100%'
    },
    placeholderContainer : {
        position    :  'absolute',
        top         : 10,
        left        : 25,
        right       : 25,
        bottom      : 10,
    },
    placeholderText : {
        color       : '#e5e5e5',
        fontSize    : 14
    },
    invalidHint : {
        fontSize    : 14,
        color       : '#ff0000',
    }
});
