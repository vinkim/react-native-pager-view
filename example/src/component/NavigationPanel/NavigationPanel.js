import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ControlsPanel } from './ControlPanel';
import { LogsPanel } from './LogsPanel';
var VisibleTab;
(function (VisibleTab) {
    VisibleTab[VisibleTab["None"] = 0] = "None";
    VisibleTab[VisibleTab["Logs"] = 1] = "Logs";
    VisibleTab[VisibleTab["Controls"] = 2] = "Controls";
})(VisibleTab || (VisibleTab = {}));
export function NavigationPanel(props) {
    const [visible, setVisible] = useState(VisibleTab.Controls);
    return (React.createElement(View, null,
        React.createElement(View, { style: styles.toggleVisibilityButtonContainer },
            React.createElement(TouchableOpacity, { style: [
                    styles.toggleVisibilityButton,
                    visible === VisibleTab.Controls &&
                        styles.toggleVisibilityButtonActive,
                ], activeOpacity: 0.8, onPress: () => setVisible((prevVisible) => prevVisible === VisibleTab.Controls
                    ? VisibleTab.None
                    : VisibleTab.Controls) },
                React.createElement(Text, { style: [
                        styles.toggleVisibilityText,
                        visible === VisibleTab.Controls &&
                            styles.toggleVisibilityTextActive,
                    ] }, "Control")),
            React.createElement(TouchableOpacity, { style: [
                    styles.toggleVisibilityButton,
                    visible === VisibleTab.Logs && styles.toggleVisibilityButtonActive,
                ], activeOpacity: 0.8, onPress: () => setVisible((prevVisible) => prevVisible === VisibleTab.Logs
                    ? VisibleTab.None
                    : VisibleTab.Logs) },
                React.createElement(Text, { style: [
                        styles.toggleVisibilityText,
                        visible === VisibleTab.Logs && styles.toggleVisibilityTextActive,
                    ] }, "Logs"))),
        visible === VisibleTab.Controls ? React.createElement(ControlsPanel, Object.assign({}, props)) : null,
        visible === VisibleTab.Logs ? React.createElement(LogsPanel, { logs: props.logs }) : null));
}
const styles = StyleSheet.create({
    toggleVisibilityButtonContainer: {
        position: 'absolute',
        left: 8,
        bottom: '100%',
        flexDirection: 'row',
    },
    toggleVisibilityButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    toggleVisibilityButtonActive: {
        backgroundColor: '#fff',
    },
    toggleVisibilityText: {
        color: '#fff',
        fontSize: 20,
    },
    toggleVisibilityTextActive: {
        color: '#000',
    },
    buttons: {
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    hiddenContainer: {
        height: 0,
        overflow: 'hidden',
    },
    buttonAdjustment: {
        flex: 1,
    },
    progress: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'black',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        paddingHorizontal: 20,
    },
    scrollState: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    scrollStateText: {
        color: '#99d1b7',
        textAlign: 'center',
    },
});
