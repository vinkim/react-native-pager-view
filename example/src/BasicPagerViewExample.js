import React, { useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, Animated, Text } from 'react-native';
import { PagerView } from 'react-native-pager-view';
import { LikeCount } from './component/LikeCount';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export function BasicPagerViewExample() {
    const { ref, ...navigationPanel } = useNavigationPanel();
    return (React.createElement(SafeAreaView, { style: styles.container },
        React.createElement(AnimatedPagerView
        //@ts-ignore
        , { 
            //@ts-ignore
            testID: "pager-view", ref: ref, style: styles.PagerView, initialPage: 0, overdrag: navigationPanel.overdragEnabled, scrollEnabled: navigationPanel.scrollEnabled, onPageScroll: navigationPanel.onPageScroll, onPageSelected: navigationPanel.onPageSelected, onPageScrollStateChanged: navigationPanel.onPageScrollStateChanged, pageMargin: 10, orientation: "horizontal", transitionStyle: "scroll", showPageIndicator: navigationPanel.dotsEnabled }, useMemo(() => navigationPanel.pages.map((page, index) => (React.createElement(View, { key: page.key, style: page.style, collapsable: false },
            React.createElement(LikeCount, null),
            React.createElement(Text, { testID: `pageNumber${index}` }, `page number ${index}`)))), [navigationPanel.pages])),
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
