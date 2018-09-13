import { StyleSheet, Platform } from 'react-native';

export default styles = StyleSheet.create({
    title : {
        marginLeft  : 15,
        fontSize    : 17,
        color       : '#000000',
    },
    textField : {
        height              : 44,
        backgroundColor     : '#ffffff',
        borderColor         : '#000000',
        borderWidth         : 1, 
        borderRadius        : 4,
        fontSize            : 18,
        marginTop           : 5,
        marginBottom        : 5,
        marginLeft          : 15,
        marginRight         : 15,
        padding             : 10,
        textAlignVertical   : 'top'
    },
    placeholderContainer : {
        position    :  'absolute',
        top         : 20,
        left        : 25,
        right       : 25,
        bottom      : 20,
    },
    placeholderText : {
        color       : '#e5e5e5',
        fontSize    : 14
    },
    invalidTextField : {
        height              : 44,
        backgroundColor     : '#ffffff',
        borderColor         : '#ff0000',
        borderWidth         : 1, 
        borderRadius        : 4,
        fontSize            : 18,
        marginTop           : 5,
        marginBottom        : 5,
        marginLeft          : 15,
        marginRight         : 15,
        padding             : 10,
        textAlignVertical   : 'top'
    },
    invalidHint : {
        marginLeft  : 15,
        marginRight : 15,
        fontSize    : 14,
        color       : '#ff0000',
    }
});
