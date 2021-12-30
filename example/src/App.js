import * as React from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BasicPagerViewExample } from './BasicPagerViewExample';
import { KeyboardExample } from './KeyboardExample';
import { LazyPagerViewExample } from './LazyPagerViewExample';
import { OnPageScrollExample } from './OnPageScrollExample';
import { OnPageSelectedExample } from './OnPageSelectedExample';
import { ScrollablePagerViewExample } from './ScrollablePagerViewExample';
import { ScrollViewInsideExample } from './ScrollViewInsideExample';
import HeadphonesCarouselExample from './HeadphonesCarouselExample';
import PaginationDotsExample from './PaginationDotsExample';
const examples = [
    { component: BasicPagerViewExample, name: 'Basic Example' },
    { component: KeyboardExample, name: 'Keyboard Example' },
    { component: LazyPagerViewExample, name: 'Lazy Render Example' },
    { component: OnPageScrollExample, name: 'OnPageScroll Example' },
    { component: OnPageSelectedExample, name: 'OnPageSelected Example' },
    { component: HeadphonesCarouselExample, name: 'Headphones Carousel Example' },
    { component: PaginationDotsExample, name: 'Pagination Dots Example' },
    {
        component: ScrollablePagerViewExample,
        name: 'Scrollable PagerView Example',
    },
    {
        component: ScrollViewInsideExample,
        name: 'ScrollView inside PagerView Example',
    },
];
// const examples = [{ component: BasicPagerViewExample, name: 'Basic Example' }];
function App() {
    const navigation = useNavigation();
    return (React.createElement(ScrollView, null, examples.map((example) => (React.createElement(TouchableOpacity, { key: example.name, style: styles.exampleTouchable, onPress: () => {
            navigation.navigate(example.name);
        } },
        React.createElement(Text, { style: styles.exampleText }, example.name))))));
}
const Stack = createStackNavigator();
export function Navigation() {
    return (React.createElement(NavigationContainer, null,
        React.createElement(Stack.Navigator, { initialRouteName: "PagerView Example" },
            React.createElement(Stack.Screen, { name: "PagerView Example", component: App }),
            examples.map((example, index) => (React.createElement(Stack.Screen, { key: index, name: example.name, component: example.component }))))));
}
const styles = StyleSheet.create({
    exampleTouchable: {
        padding: 16,
    },
    exampleText: {
        fontSize: 16,
    },
});
