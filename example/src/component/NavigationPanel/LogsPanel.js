import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
export function LogsPanel({ logs }) {
    console.log(logs);
    return (React.createElement(FlatList, { style: styles.container, keyExtractor: ({ timestamp }) => `${timestamp.getTime()}`, data: logs, renderItem: ({ item }) => (
        //@ts-ignore
        React.createElement(View, { style: [styles.item, styles[item.event]] },
            React.createElement(Text, { style: styles.text },
                item.timestamp.toLocaleTimeString(),
                React.createElement(Text, { style: styles.eventName },
                    ' | ',
                    item.event.toLocaleUpperCase())),
            React.createElement(Text, { style: styles.text }, item.text))) }));
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        height: 250,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    scroll: {
        backgroundColor: 'cyan',
    },
    select: {
        backgroundColor: 'greenyellow',
    },
    statusChanged: {
        backgroundColor: 'tomato',
    },
    text: {
        color: '#000',
    },
    eventName: {
        color: '#595959',
    },
});
