/*
Inspiration: https://dribbble.com/shots/3894781-Urbanears-Headphones
Twitter: http://twitter.com/mironcatalin
GitHub: http://github.com/catalinmiron
Video Tutorial: https://youtu.be/cGTD4yYgEHc
Link to example: https://github.com/catalinmiron/react-native-headphones-carousel
*/
import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, Animated, } from 'react-native';
import { PagerView } from 'react-native-pager-view';
const data = [
    {
        type: 'Humlan P',
        imageUri: require('../assets/urbanears_blue.png'),
        heading: 'Vibrant colors',
        description: 'Four on-trend colorways to seamlessly suit your style.',
        key: 'first',
        color: '#9dcdfa',
    },
    {
        type: 'Pampas',
        imageUri: require('../assets/urbanears_pink.png'),
        heading: 'Redefined sound',
        description: 'A bold statement tuned to perfection.',
        key: 'second',
        color: '#db9efa',
    },
    {
        type: 'Humlan P',
        imageUri: require('../assets/urbanears_grey.png'),
        heading: 'Great quality',
        description: 'An Urbanears classic! Listen-all-day fit. Striking the perfect balance of effortless technology',
        key: 'third',
        color: '#999',
    },
    {
        type: 'Humlan B',
        imageUri: require('../assets/urbanears_mint.png'),
        heading: 'From Sweden',
        description: 'The “Plattan” in Plattan headphones is Swedish for “the slab.”',
        key: 'fourth',
        color: '#a1e3a1',
    },
];
const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;
const Circle = ({ scrollOffsetAnimatedValue, }) => {
    return (React.createElement(View, { style: [StyleSheet.absoluteFillObject, styles.circleContainer] }, data.map(({ color }, index) => {
        const inputRange = [0, 0.5, 0.99];
        const inputRangeOpacity = [0, 0.5, 0.99];
        const scale = scrollOffsetAnimatedValue.interpolate({
            inputRange,
            outputRange: [1, 0, 1],
            extrapolate: 'clamp',
        });
        const opacity = scrollOffsetAnimatedValue.interpolate({
            inputRange: inputRangeOpacity,
            outputRange: [0.2, 0, 0.2],
        });
        return (React.createElement(Animated.View, { key: index, style: [
                styles.circle,
                {
                    backgroundColor: color,
                    opacity,
                    transform: [{ scale }],
                },
            ] }));
    })));
};
const Ticker = ({ scrollOffsetAnimatedValue, positionAnimatedValue, }) => {
    const inputRange = [0, data.length];
    const translateY = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
        inputRange,
        outputRange: [0, data.length * -TICKER_HEIGHT],
    });
    return (React.createElement(View, { style: styles.tickerContainer },
        React.createElement(Animated.View, { style: { transform: [{ translateY }] } }, data.map(({ type }, index) => {
            return (React.createElement(Text, { key: index, style: styles.tickerText }, type));
        }))));
};
const Item = ({ imageUri, heading, description, scrollOffsetAnimatedValue, }) => {
    const inputRange = [0, 0.5, 0.99];
    const inputRangeOpacity = [0, 0.5, 0.99];
    const scale = scrollOffsetAnimatedValue.interpolate({
        inputRange,
        outputRange: [1, 0, 1],
    });
    const opacity = scrollOffsetAnimatedValue.interpolate({
        inputRange: inputRangeOpacity,
        outputRange: [1, 0, 1],
    });
    return (React.createElement(View, { style: styles.itemStyle },
        React.createElement(Animated.Image, { source: imageUri, style: [
                styles.imageStyle,
                {
                    transform: [{ scale }],
                },
            ] }),
        React.createElement(View, { style: styles.textContainer },
            React.createElement(Animated.Text, { style: [
                    styles.heading,
                    {
                        opacity,
                    },
                ] }, heading),
            React.createElement(Animated.Text, { style: [
                    styles.description,
                    {
                        opacity,
                    },
                ] }, description))));
};
const Pagination = ({ scrollOffsetAnimatedValue, positionAnimatedValue, }) => {
    const inputRange = [0, data.length];
    const translateX = Animated.add(scrollOffsetAnimatedValue, positionAnimatedValue).interpolate({
        inputRange,
        outputRange: [0, data.length * DOT_SIZE],
    });
    return (React.createElement(View, { style: [styles.pagination] },
        React.createElement(Animated.View, { style: [
                styles.paginationIndicator,
                {
                    position: 'absolute',
                    transform: [{ translateX: translateX }],
                },
            ] }),
        data.map((item) => {
            return (React.createElement(View, { key: item.key, style: styles.paginationDotContainer },
                React.createElement(View, { style: [styles.paginationDot, { backgroundColor: item.color }] })));
        })));
};
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
export default function HeadphonesCarouselExample() {
    const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
    const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
    return (React.createElement(View, { style: styles.container },
        React.createElement(Circle, { scrollOffsetAnimatedValue: scrollOffsetAnimatedValue }),
        React.createElement(AnimatedPagerView, { initialPage: 0, style: { width: '100%', height: '100%' }, onPageScroll: Animated.event([
                {
                    nativeEvent: {
                        offset: scrollOffsetAnimatedValue,
                        position: positionAnimatedValue,
                    },
                },
            ], {
                listener: ({ nativeEvent: { offset, position } }) => {
                    console.log(`Position: ${position} Offset: ${offset}`);
                },
                useNativeDriver: true,
            }) }, data.map((item, index) => (React.createElement(View, { collapsable: false, key: index },
            React.createElement(Item, Object.assign({}, item, { scrollOffsetAnimatedValue: scrollOffsetAnimatedValue, positionAnimatedValue: positionAnimatedValue })))))),
        React.createElement(Image, { style: styles.logo, source: require('../assets/ue_black_logo.png') }),
        React.createElement(Pagination, { scrollOffsetAnimatedValue: scrollOffsetAnimatedValue, positionAnimatedValue: positionAnimatedValue }),
        React.createElement(Ticker, { scrollOffsetAnimatedValue: scrollOffsetAnimatedValue, positionAnimatedValue: positionAnimatedValue })));
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemStyle: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: width * 0.75,
        height: width * 0.75,
        resizeMode: 'contain',
        flex: 1,
    },
    textContainer: {
        alignItems: 'flex-start',
        alignSelf: 'flex-end',
        flex: 0.5,
    },
    heading: {
        color: '#444',
        textTransform: 'uppercase',
        fontSize: 24,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 5,
    },
    description: {
        color: '#ccc',
        fontWeight: '600',
        textAlign: 'left',
        width: width * 0.75,
        marginRight: 10,
        fontSize: 16,
        lineHeight: 16 * 1.5,
    },
    logo: {
        opacity: 0.9,
        height: LOGO_HEIGHT,
        width: LOGO_WIDTH,
        resizeMode: 'contain',
        position: 'absolute',
        left: 10,
        bottom: 10,
        transform: [
            { translateX: -LOGO_WIDTH / 2 },
            { translateY: -LOGO_HEIGHT / 2 },
            { rotateZ: '-90deg' },
            { translateX: LOGO_WIDTH / 2 },
            { translateY: LOGO_HEIGHT / 2 },
        ],
    },
    pagination: {
        position: 'absolute',
        right: 20,
        bottom: 40,
        flexDirection: 'row',
        height: DOT_SIZE,
    },
    paginationDot: {
        width: DOT_SIZE * 0.3,
        height: DOT_SIZE * 0.3,
        borderRadius: DOT_SIZE * 0.15,
    },
    paginationDotContainer: {
        width: DOT_SIZE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paginationIndicator: {
        width: DOT_SIZE,
        height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    tickerContainer: {
        position: 'absolute',
        top: 40,
        left: 20,
        overflow: 'hidden',
        height: TICKER_HEIGHT,
    },
    tickerText: {
        fontSize: TICKER_HEIGHT,
        lineHeight: TICKER_HEIGHT,
        textTransform: 'uppercase',
        fontWeight: '800',
    },
    circleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        position: 'absolute',
        top: '15%',
    },
});
