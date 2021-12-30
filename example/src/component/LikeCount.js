import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { thumbsUp } from '../utils';
export class LikeCount extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            likes: 7,
        };
        this.onClick = () => {
            this.setState((state) => ({ likes: state.likes + 1 }));
        };
    }
    render() {
        return (React.createElement(View, { style: styles.likeContainer },
            React.createElement(TouchableOpacity, { onPress: this.onClick, style: styles.likeButton },
                React.createElement(Text, { style: styles.likesText }, thumbsUp + ' Like')),
            React.createElement(Text, { style: styles.likesText }, this.state.likes + ' likes')));
    }
}
const styles = StyleSheet.create({
    likeContainer: {
        flexDirection: 'row',
        height: 45,
    },
    likesText: {
        flex: 1,
        fontSize: 18,
        alignSelf: 'center',
    },
    likeButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderColor: '#333333',
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        margin: 8,
    },
});
