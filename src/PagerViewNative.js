import { requireNativeComponent, UIManager } from 'react-native';
const VIEW_MANAGER_NAME = 'RNCustomViewPager';
export const PagerViewViewManager = requireNativeComponent(VIEW_MANAGER_NAME);
export function getViewManagerConfig(viewManagerName = VIEW_MANAGER_NAME) {
    return UIManager.getViewManagerConfig(viewManagerName);
}
