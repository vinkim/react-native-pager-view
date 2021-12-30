import { PagerView } from 'react-native-pager-view';
import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Button, ScrollView, Animated } from 'react-native';
import { PAGES, createPage } from './utils';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export const ScrollViewInsideExample = () => {
    const [pages] = useState(Array(PAGES)
        .fill(1)
        .map((_, index) => createPage(index)));
    return (React.createElement(AnimatedPagerView, { style: styles.flex }, pages.map((page) => (React.createElement(ScrollView, { key: page.key, style: styles.content }, Array(20)
        .fill(1)
        .map((_, index) => (React.createElement(View, { key: `${page.key}_${index}`, style: styles.separator },
        React.createElement(Button, { title: "Click me", onPress: () => {
                console.log('Button Clicked');
            } })))))))));
};
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        marginVertical: 10,
    },
    separator: {
        margin: 16,
    },
});
