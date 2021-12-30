import React from 'react';
import { Platform, UIManager, Keyboard } from 'react-native';
import ReactNative from 'react-native';
import { childrenWithOverriddenStyle } from './utils';
import { getViewManagerConfig, PagerViewViewManager } from './PagerViewNative';
/**
 * Container that allows to flip left and right between child views. Each
 * child view of the `PagerView` will be treated as a separate page
 * and will be stretched to fill the `PagerView`.
 *
 * It is important all children are `<View>`s and not composite components.
 * You can set style properties like `padding` or `backgroundColor` for each
 * child. It is also important that each child have a `key` prop.
 *
 * Example:
 *
 * ```
 * render: function() {
 *   return (
 *     <PagerView
 *       style={styles.PagerView}
 *       initialPage={0}>
 *       <View style={styles.pageStyle} key="1">
 *         <Text>First page</Text>
 *       </View>
 *       <View style={styles.pageStyle} key="2">
 *         <Text>Second page</Text>
 *       </View>
 *     </PagerView>
 *   );
 * }
 *
 * ...
 *
 * var styles = {
 *   ...
 *   PagerView: {
 *     flex: 1
 *   },
 *   pageStyle: {
 *     alignItems: 'center',
 *     padding: 20,
 *   }
 * }
 * ```
 */
export class PagerView extends React.Component {
    constructor() {
        super(...arguments);
        this.isScrolling = false;
        this._onPageScroll = (e) => {
            if (this.props.onPageScroll) {
                this.props.onPageScroll(e);
            }
            // Not implemented on iOS yet
            if (Platform.OS === 'android') {
                if (this.props.keyboardDismissMode === 'on-drag') {
                    Keyboard.dismiss();
                }
            }
        };
        this._onPageScrollStateChanged = (e) => {
            if (this.props.onPageScrollStateChanged) {
                this.props.onPageScrollStateChanged(e);
            }
            this.isScrolling = e.nativeEvent.pageScrollState === 'dragging';
        };
        this._onPageSelected = (e) => {
            if (this.props.onPageSelected) {
                this.props.onPageSelected(e);
            }
        };
        /**
         * A helper function to scroll to a specific page in the PagerView.
         * The transition between pages will be animated.
         */
        this.setPage = (selectedPage) => {
            UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(this), getViewManagerConfig().Commands.setPage, [selectedPage]);
        };
        /**
         * A helper function to scroll to a specific page in the PagerView.
         * The transition between pages will *not* be animated.
         */
        this.setPageWithoutAnimation = (selectedPage) => {
            UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(this), getViewManagerConfig().Commands.setPageWithoutAnimation, [selectedPage]);
        };
        /**
         * A helper function to enable/disable scroll imperatively
         * The recommended way is using the scrollEnabled prop, however, there might be a case where a
         * imperative solution is more useful (e.g. for not blocking an animation)
         */
        this.setScrollEnabled = (scrollEnabled) => {
            UIManager.dispatchViewManagerCommand(ReactNative.findNodeHandle(this), getViewManagerConfig().Commands.setScrollEnabled, [scrollEnabled]);
        };
        this._onMoveShouldSetResponderCapture = () => {
            return this.isScrolling;
        };
    }
    componentWillUnmount() {
        if (this.animationFrameRequestId !== undefined) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
    }
    componentDidMount() {
        if (this.props.initialPage !== undefined) {
            this.animationFrameRequestId = requestAnimationFrame(() => {
                if (this.props.initialPage !== undefined) {
                    this.setPageWithoutAnimation(this.props.initialPage);
                }
            });
        }
    }
    render() {
        return (React.createElement(PagerViewViewManager, Object.assign({}, this.props, { count: React.Children.count(this.props.children), offset: 0, style: this.props.style, onPageScroll: this._onPageScroll, onPageScrollStateChanged: this._onPageScrollStateChanged, onPageSelected: this._onPageSelected, onMoveShouldSetResponderCapture: this._onMoveShouldSetResponderCapture, children: childrenWithOverriddenStyle(this.props.children) })));
    }
}
