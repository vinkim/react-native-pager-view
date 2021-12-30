import { PagerView } from 'react-native-pager-view';
import React from 'react';
import { ScrollView, View, Image, StyleSheet, Animated } from 'react-native';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
const HEIGHT = 300;
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export const ScrollablePagerViewExample = () => {
    const { ref, ...navigationPanel } = useNavigationPanel();
    return (React.createElement(React.Fragment, null,
        React.createElement(ScrollView, { style: styles.flex }, navigationPanel.pages.map(({ key }) => (React.createElement(AnimatedPagerView, Object.assign({}, navigationPanel, { ref: ref, key: key, style: { height: HEIGHT } }), navigationPanel.pages.map((page) => (React.createElement(View, { key: `${key}+${page.key}`, style: styles.content },
            React.createElement(Image, { style: styles.flex, source: page.imgSource })))))))),
        React.createElement(NavigationPanel, Object.assign({}, navigationPanel))));
};
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginVertical: 10,
    },
});
