import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, Image, TextInput, Button, Animated, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { PagerView } from 'react-native-pager-view';
import { logoUrl } from './utils';
import { NavigationPanel } from './component/NavigationPanel';
import { useNavigationPanel } from './hook/useNavigationPanel';
const Page = ({ title, description, onPress, buttonTitle }) => {
    return (React.createElement(React.Fragment, null,
        React.createElement(Text, { style: styles.sectionTitle }, title),
        React.createElement(Text, { style: styles.sectionDescription }, description),
        React.createElement(TextInput, { style: styles.textInput }),
        React.createElement(Button, { onPress: onPress, title: buttonTitle })));
};
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export function KeyboardExample() {
    const { ref, ...navigationPanel } = useNavigationPanel(2);
    const { setPage } = navigationPanel;
    return (React.createElement(SafeAreaView, { style: styles.flex },
        React.createElement(ScrollView, { contentContainerStyle: styles.flex, style: styles.flex },
            React.createElement(View, { style: styles.logoContainer },
                React.createElement(Image, { style: styles.logo, source: {
                        uri: logoUrl,
                    } })),
            React.createElement(View, { style: styles.flex },
                React.createElement(AnimatedPagerView, Object.assign({}, navigationPanel, { ref: ref, style: styles.flex, initialPage: 0, scrollEnabled: false }),
                    React.createElement(View, { style: styles.sectionContainer },
                        React.createElement(Page, { title: "First Question", description: "What is your favourite lib ?", onPress: useCallback(() => setPage(1), [setPage]), buttonTitle: "Go to next question" })),
                    React.createElement(View, { style: styles.sectionContainer },
                        React.createElement(Page, { title: "Second Question", description: "Why Pager View?", onPress: useCallback(() => setPage(0), [setPage]), buttonTitle: "Go to previous question" }))))),
        React.createElement(NavigationPanel, Object.assign({}, navigationPanel, { scrollEnabled: false, disablePagesAmountManagement: true }))));
}
const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 300,
    },
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.black,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    sectionDescription: {
        marginVertical: 16,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
        fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
});
