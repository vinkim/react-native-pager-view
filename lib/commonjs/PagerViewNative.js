"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagerViewViewManager = void 0;
exports.getViewManagerConfig = getViewManagerConfig;

var _reactNative = require("react-native");

const VIEW_MANAGER_NAME = 'RNCustomViewPager';
const PagerViewViewManager = (0, _reactNative.requireNativeComponent)(VIEW_MANAGER_NAME);
exports.PagerViewViewManager = PagerViewViewManager;

function getViewManagerConfig() {
  let viewManagerName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : VIEW_MANAGER_NAME;
  return _reactNative.UIManager.getViewManagerConfig(viewManagerName);
}
//# sourceMappingURL=PagerViewNative.js.map