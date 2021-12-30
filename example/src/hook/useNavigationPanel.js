import { Animated } from 'react-native';
import { createPage } from '../utils';
import { useCallback, useMemo, useRef, useState } from 'react';
const getBasePages = (pages) => new Array(pages).fill('').map((_v, index) => createPage(index));
export function useNavigationPanel(pagesAmount = 10, onPageSelectedCallback = () => { }) {
    const ref = useRef(null);
    const [pages, setPages] = useState(useMemo(() => getBasePages(pagesAmount), [pagesAmount]));
    const [activePage, setActivePage] = useState(0);
    const [isAnimated, setIsAnimated] = useState(true);
    const [overdragEnabled, setOverdragEnabled] = useState(false);
    const [scrollEnabled, setScrollEnabled] = useState(true);
    const [scrollState, setScrollState] = useState('idle');
    const [dotsEnabled, setDotsEnabled] = useState(false);
    const [logs, setLogs] = useState([]);
    const [progress, setProgress] = useState({ position: 0, offset: 0 });
    const onPageScrollOffset = useRef(new Animated.Value(0)).current;
    const onPageScrollPosition = useRef(new Animated.Value(0)).current;
    const onPageSelectedPosition = useRef(new Animated.Value(0)).current;
    const setPage = useCallback((page) => isAnimated
        ? ref.current?.setPage(page)
        : ref.current?.setPageWithoutAnimation(page), [isAnimated]);
    const addLog = useCallback((log) => {
        setLogs((text) => [log, ...text].slice(0, 100));
    }, []);
    const addPage = useCallback(() => setPages((prevPages) => [...prevPages, createPage(prevPages.length)]), []);
    const removePage = useCallback(() => setPages((prevPages) => prevPages.slice(0, prevPages.length - 1)), []);
    const toggleAnimation = useCallback(() => setIsAnimated((animated) => !animated), []);
    const toggleScroll = useCallback(() => setScrollEnabled((enabled) => !enabled), []);
    const toggleDots = useCallback(() => setDotsEnabled((enabled) => !enabled), []);
    const toggleOverdrag = useCallback(() => setOverdragEnabled((enabled) => !enabled), []);
    const onPageScroll = useMemo(() => Animated.event([
        {
            nativeEvent: {
                offset: onPageScrollOffset,
                position: onPageScrollPosition,
            },
        },
    ], {
        listener: ({ nativeEvent: { offset, position } }) => {
            addLog({
                event: 'scroll',
                text: `Position: ${position} Offset: ${offset}`,
                timestamp: new Date(),
            });
            setProgress({
                position,
                offset,
            });
        },
        useNativeDriver: true,
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const onPageSelected = useMemo(() => Animated.event([{ nativeEvent: { position: onPageSelectedPosition } }], {
        listener: ({ nativeEvent: { position } }) => {
            addLog({
                event: 'select',
                text: `Page: ${position}`,
                timestamp: new Date(),
            });
            setActivePage(position);
            onPageSelectedCallback(position);
        },
        useNativeDriver: true,
    }), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    const onPageScrollStateChanged = useCallback((e) => {
        addLog({
            event: 'statusChanged',
            text: `State: ${e.nativeEvent.pageScrollState}`,
            timestamp: new Date(),
        });
        setScrollState(e.nativeEvent.pageScrollState);
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    return {
        ref,
        activePage,
        isAnimated,
        pages,
        scrollState,
        scrollEnabled,
        dotsEnabled,
        progress,
        overdragEnabled,
        setPage,
        addPage,
        removePage,
        toggleScroll,
        toggleDots,
        toggleAnimation,
        setProgress,
        onPageScroll,
        onPageSelected,
        onPageScrollStateChanged,
        toggleOverdrag,
        logs,
    };
}
