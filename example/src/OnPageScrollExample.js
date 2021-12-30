import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Animated } from 'react-native';
import { PagerView } from 'react-native-pager-view';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { ProgressBar } from './component/ProgressBar';
import { useNavigationPanel } from './hook/useNavigationPanel';
import { NavigationPanel } from './component/NavigationPanel';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export function OnPageScrollExample() {
    const { ref, ...navigationPanel } = useNavigationPanel(5);
    const { activePage, setPage, progress, pages } = navigationPanel;
    return (React.createElement(SafeAreaView, { style: styles.flex },
        React.createElement(View, { style: styles.container },
            React.createElement(ScrollView, { horizontal: true }, pages.map((_v, index) => (React.createElement(TouchableOpacity, { key: index, onPress: () => setPage(index) },
                React.createElement(View, { style: styles.separator },
                    React.createElement(Text, { style: [
                            styles.touchableTitle,
                            activePage === index && styles.touchableTitleActive,
                        ] },
                        "Page ",
                        index))))))),
        React.createElement(AnimatedPagerView, Object.assign({}, navigationPanel, { ref: ref, style: styles.PagerView, initialPage: 0 }), navigationPanel.pages.map(({ key, style }) => (React.createElement(View, { key: key, style: [style, styles.center] },
            React.createElement(Text, { style: styles.text }, `Page Index: ${key}`))))),
        React.createElement(View, { style: styles.progressContainer },
            React.createElement(ProgressBar, { numberOfPages: pages.length, progress: progress })),
        React.createElement(NavigationPanel, Object.assign({}, navigationPanel, { disablePagesAmountManagement: true }))));
}
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    PagerView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        backgroundColor: '#63a4ff',
    },
    progressContainer: { flex: 0.1, backgroundColor: '#63a4ff' },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 30,
    },
    separator: {
        paddingVertical: 16,
        paddingHorizontal: 10,
    },
    touchableTitle: {
        textAlign: 'center',
        color: '#000',
    },
    touchableTitleActive: {
        color: '#fff',
    },
});
