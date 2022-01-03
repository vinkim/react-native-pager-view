import { requireNativeComponent, UIManager } from 'react-native';
const VIEW_MANAGER_NAME = 'RNCustomViewPager';
export const PagerViewViewManager = requireNativeComponent(VIEW_MANAGER_NAME);
export function getViewManagerConfig() {
  let viewManagerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VIEW_MANAGER_NAME;
  return UIManager.getViewManagerConfig(viewManagerName);
}
//# sourceMappingURL=PagerViewNative.js.map