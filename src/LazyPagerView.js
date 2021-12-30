import React from 'react';
import { findNodeHandle, Keyboard, StyleSheet, UIManager, View, } from 'react-native';
import { getViewManagerConfig, PagerViewViewManager } from './PagerViewNative';
/**
 * PagerView implementation that renders pages when needed (lazy loading)
 */
export class LazyPagerView extends React.PureComponent {
    constructor() {
        super(...arguments);
        this.pagerImplRef = React.createRef();
    }
    setPage(page) {
        this.pagerImplRef.current?.setPage(page, true);
    }
    setPageWithoutAnimation(page) {
        this.pagerImplRef.current?.setPage(page, false);
    }
    setScrollEnabled(scrollEnabled) {
        this.pagerImplRef.current?.setScrollEnabled(scrollEnabled);
    }
    setScrollLocked(scrollLocked) {
        this.pagerImplRef.current?.setScrollLocked(scrollLocked);
    }
    render() {
        const { style, ...implProps } = this.props;
        return (React.createElement(View, { style: style },
            React.createElement(LazyPagerViewImpl, Object.assign({}, implProps, { ref: this.pagerImplRef }))));
    }
}
class LazyPagerViewImpl extends React.Component {
    constructor(props) {
        super(props);
        this.isNavigatingToPage = null;
        this.isScrolling = false;
        this.onMoveShouldSetResponderCapture = () => this.isScrolling;
        this.onPageScroll = (event) => {
            this.props.onPageScroll?.(event);
            if (this.props.keyboardDismissMode === 'on-drag') {
                Keyboard.dismiss();
            }
        };
        this.onPageScrollStateChanged = (event) => {
            this.props.onPageScrollStateChanged?.(event);
            this.isScrolling = event.nativeEvent.pageScrollState === 'dragging';
        };
        this.onPageSelected = (event) => {
            const currentPage = event.nativeEvent.position;
            // Ignore spurious events that can occur on mount with `initialPage`.
            // TODO: Is there a way to avoid triggering the events at all?
            if (this.isNavigatingToPage != null) {
                if (this.isNavigatingToPage === currentPage) {
                    this.isNavigatingToPage = null;
                }
                else {
                    // Ignore event.
                    return;
                }
            }
            // Queue renders for next needed pages (if not already available).
            requestAnimationFrame(() => {
                this.setState((prevState) => this.computeRenderWindow({
                    buffer: this.props.buffer,
                    currentPage,
                    maxRenderWindow: this.props.maxRenderWindow,
                    offset: prevState.offset,
                    windowLength: prevState.windowLength,
                }));
            });
            this.props.onPageSelected?.(event);
        };
        const initialPage = Math.max(this.props.initialPage ?? 0, 0);
        this.state = this.computeRenderWindow({
            buffer: props.buffer,
            currentPage: initialPage,
            maxRenderWindow: props.maxRenderWindow,
            offset: initialPage,
            windowLength: 0,
        });
    }
    componentWillUnmount() {
        if (this.animationFrameRequestId !== undefined) {
            cancelAnimationFrame(this.animationFrameRequestId);
        }
    }
    componentDidMount() {
        const initialPage = this.props.initialPage;
        if (initialPage != null && initialPage > 0) {
            this.isNavigatingToPage = initialPage;
            this.animationFrameRequestId = requestAnimationFrame(() => {
                // Send command directly; render window already contains destination.
                UIManager.dispatchViewManagerCommand(findNodeHandle(this), getViewManagerConfig().Commands.setPageWithoutAnimation, [initialPage]);
            });
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        const stateKeys = [
            'offset',
            'windowLength',
        ];
        for (const stateKey of stateKeys) {
            if (this.state[stateKey] !== nextState[stateKey]) {
                return true;
            }
        }
        const propKeys = [
            'data',
            'keyExtractor',
            'offscreenPageLimit',
            'orientation',
            'overdrag',
            'overScrollMode',
            'pageMargin',
            'renderItem',
            'scrollEnabled',
            'showPageIndicator',
            'transitionStyle',
        ];
        for (const propKey of propKeys) {
            if (this.props[propKey] !== nextProps[propKey]) {
                return true;
            }
        }
        return false;
    }
    /**
     * A helper function to scroll to a specific page in the PagerView.
     */
    setPage(page, animated) {
        if (page < 0 || page >= this.props.data.length) {
            return;
        }
        // Start rendering the destination.
        this.setState((prevState) => this.computeRenderWindow({
            buffer: this.props.buffer,
            currentPage: page,
            maxRenderWindow: this.props.maxRenderWindow,
            offset: prevState.offset,
            windowLength: prevState.windowLength,
        }));
        // Send paging command.
        requestAnimationFrame(() => {
            UIManager.dispatchViewManagerCommand(findNodeHandle(this), animated
                ? getViewManagerConfig().Commands.setPage
                : getViewManagerConfig().Commands.setPageWithoutAnimation, [page]);
        });
    }
    /**
     * A helper function to enable/disable scroll imperatively.
     * The recommended way is using the scrollEnabled prop, however, there might
     * be a case where an imperative solution is more useful (e.g. for not
     * blocking an animation)
     */
    setScrollEnabled(scrollEnabled) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), getViewManagerConfig().Commands.setScrollEnabled, [scrollEnabled]);
    }
    setScrollLocked(scrollLocked) {
        UIManager.dispatchViewManagerCommand(findNodeHandle(this), getViewManagerConfig().Commands.setScrollLocked, [scrollLocked]);
    }
    /**
     * Compute desired render window size.
     *
     * Returns `offset` and `windowLength` unmodified, unless in conflict with
     * restrictions from `buffer` or `maxRenderWindow`.
     */
    computeRenderWindow(data) {
        const buffer = Math.max(data.buffer ?? 1, 1);
        const maxRenderWindowLowerBound = 1 + 2 * buffer;
        let offset = Math.max(Math.min(data.offset, data.currentPage - buffer), 0);
        let windowLength = Math.max(data.offset + data.windowLength, data.currentPage + buffer + 1) -
            offset;
        let maxRenderWindow = data.maxRenderWindow ?? 0;
        if (maxRenderWindow !== 0) {
            if (maxRenderWindow < maxRenderWindowLowerBound) {
                console.warn(`maxRenderWindow too small. Increasing to ${maxRenderWindowLowerBound}`);
                maxRenderWindow = maxRenderWindowLowerBound;
            }
            if (windowLength > maxRenderWindow) {
                offset = data.currentPage - Math.floor(maxRenderWindow / 2);
                windowLength = maxRenderWindow;
            }
        }
        return { offset, windowLength };
    }
    renderChildren(offset, windowLength) {
        const keys = [];
        return {
            children: this.props.data
                .slice(offset, offset + windowLength)
                .map((item, index) => {
                const key = this.props.keyExtractor(item, offset + index);
                keys.push(key);
                return (React.createElement(View, { collapsable: false, key: key, style: styles.pageContainer }, this.props.renderItem({ item, index: offset + index })));
            }),
            keys,
        };
    }
    render() {
        const { offset, windowLength } = this.state;
        const { children } = this.renderChildren(offset, windowLength);
        return (React.createElement(PagerViewViewManager, { count: this.props.data.length, offscreenPageLimit: this.props.offscreenPageLimit, offset: offset, onMoveShouldSetResponderCapture: this.onMoveShouldSetResponderCapture, onPageScroll: this.onPageScroll, onPageScrollStateChanged: this.onPageScrollStateChanged, onPageSelected: this.onPageSelected, orientation: this.props.orientation, overdrag: this.props.overdrag, overScrollMode: this.props.overScrollMode, pageMargin: this.props.pageMargin, scrollEnabled: this.props.scrollEnabled, showPageIndicator: this.props.showPageIndicator, style: styles.nativeView, transitionStyle: this.props.transitionStyle }, children));
    }
}
const styles = StyleSheet.create({
    nativeView: { flex: 1 },
    pageContainer: { height: '100%', position: 'absolute', width: '100%' },
});
