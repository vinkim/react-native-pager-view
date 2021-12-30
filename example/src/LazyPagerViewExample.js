import React, { useEffect } from 'react';
import { Image, StyleSheet, View, SafeAreaView, Animated } from 'react-native';
import { LazyPagerView } from 'react-native-pager-view';
import { LikeCount } from './component/LikeCount';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView);
function keyExtractor(page) {
    return `${page.key}`;
}
function ExampleLazyView({ item }) {
    useEffect(() => {
        console.log(`didmout ${item.key}`);
        return () => {
            console.log(`didunmout ${item.key}`);
        };
    }, [item.key]);
    return (React.createElement(View, { style: item.style },
        React.createElement(Image, { style: styles.image, source: item.imgSource }),
        React.createElement(LikeCount, null)));
}
function renderItem({ item }) {
    return React.createElement(ExampleLazyView, { item: item });
}
export function LazyPagerViewExample() {
    const { ref, ...navigationPanel } = useNavigationPanel(10000);
    return (React.createElement(SafeAreaView, { style: styles.container },
        React.createElement(AnimatedPagerView, { ref: ref, style: styles.PagerView, initialPage: 0, buffer: 2, maxRenderWindow: 20, overdrag: navigationPanel.overdragEnabled, scrollEnabled: navigationPanel.scrollEnabled, onPageScroll: navigationPanel.onPageScroll, onPageSelected: navigationPanel.onPageSelected, onPageScrollStateChanged: navigationPanel.onPageScrollStateChanged, pageMargin: 10, 
            // Lib does not support dynamically orientation change
            orientation: "horizontal", 
            // Lib does not support dynamically transitionStyle change
            transitionStyle: "scroll", showPageIndicator: navigationPanel.dotsEnabled, data: navigationPanel.pages, keyExtractor: keyExtractor, renderItem: renderItem }),
        React.createElement(NavigationPanel, Object.assign({}, navigationPanel))));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    image: {
        width: 300,
        height: 200,
        padding: 20,
    },
    PagerView: {
        flex: 1,
    },
});
