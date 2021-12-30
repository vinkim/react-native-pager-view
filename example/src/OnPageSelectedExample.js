import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, Animated, } from 'react-native';
import { PagerView } from 'react-native-pager-view';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export const OnPageSelectedExample = () => {
    const callback = React.useCallback((position) => {
        Alert.alert('Hey', `You are on ${position + 1} page`);
    }, []);
    const { ref, ...navigationPanel } = useNavigationPanel(10, callback);
    return (React.createElement(SafeAreaView, { style: styles.flex },
        React.createElement(AnimatedPagerView, Object.assign({}, navigationPanel, { ref: ref, style: styles.flex, initialPage: 0 }), navigationPanel.pages.map(({ key, style }) => (React.createElement(View, { key: key, style: [style, styles.center] },
            React.createElement(Text, { style: styles.text }, `Page Index: ${key}`))))),
        React.createElement(NavigationPanel, Object.assign({}, navigationPanel))));
};
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: 20,
    },
    text: {
        fontSize: 30,
    },
});
