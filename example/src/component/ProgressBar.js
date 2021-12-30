import React from 'react';
import { StyleSheet, View } from 'react-native';
export class ProgressBar extends React.Component {
    render() {
        const fractionalPosition = this.props.progress.position + this.props.progress.offset;
        const size = fractionalPosition / (this.props.numberOfPages - 1);
        console.log(size);
        return (React.createElement(View, { style: styles.progressBarContainer },
            React.createElement(View, { style: [styles.progressBar, { width: `${size * 100}%` }] })));
    }
}
const styles = StyleSheet.create({
    progressBarContainer: {
        flex: 1,
        height: 10,
        margin: 10,
        borderColor: '#eeeeee',
        borderWidth: 2,
        justifyContent: 'center',
    },
    progressBar: {
        flex: 1,
        backgroundColor: '#eeeeee',
    },
});
