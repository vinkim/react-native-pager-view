import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View, } from 'react-native';
export class Button extends React.Component {
    constructor() {
        super(...arguments);
        this._handlePress = () => {
            if (!this.props.disabled && this.props.onPress) {
                this.props.onPress();
            }
        };
    }
    render() {
        return (React.createElement(TouchableWithoutFeedback, { onPress: this._handlePress },
            React.createElement(View, { style: [
                    styles.button,
                    !this.props.disabled ? {} : styles.buttonDisabled,
                    this.props.style,
                ] },
                React.createElement(Text, { style: styles.buttonText }, this.props.text))));
    }
}
const styles = StyleSheet.create({
    button: {
        flex: 1,
        width: 0,
        margin: 5,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'gray',
    },
    buttonDisabled: {
        backgroundColor: 'black',
        opacity: 0.5,
    },
    buttonText: {
        color: 'white',
        margin: 10,
    },
});
