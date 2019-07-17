import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
    title : {
        fontSize    : 17,
        color       : '#000000',
    },
    textInput : {
        height              : 44,
        backgroundColor     : 'transparent',
        fontSize            : 18,
        textAlignVertical   : 'top',
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
    },
    central : {
        alignItems: 'center', 
        justifyContent: 'center'
    },
    flexRowEnd: {
        flexDirection: 'row', 
        display: 'flex', 
        justifyContent: 'flex-end'
    },
    defaultPadding: {
        paddingLeft: 10, 
        paddingRight: 10
    },
    textField: {
        borderWidth: 1, 
        borderRadius: 4, 
        borderColor: '#000000'
    },
    invalidTextField: {
        borderWidth: 1, 
        borderRadius: 4, 
        borderColor: '#ff0000'
    },
    disabledTextField: {
        borderWidth: 1, 
        borderRadius: 4, 
        borderColor: '#b2b4b8',
        backgroundColor: '#e1e2e6'
    },
    disabledTextInput: {
        color: '#b2b4b8'
    },
});
