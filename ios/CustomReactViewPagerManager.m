#import "CustomReactViewPagerManager.h"

@implementation CustomReactViewPagerManager

#pragma mark - RTC

RCT_EXPORT_MODULE(RNCustomViewPager)

RCT_EXPORT_VIEW_PROPERTY(count, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(offset, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(orientation, UIPageViewControllerNavigationOrientation)
RCT_EXPORT_VIEW_PROPERTY(overdrag, BOOL)
RCT_EXPORT_VIEW_PROPERTY(pageMargin, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(scrollEnabled, BOOL)
RCT_EXPORT_VIEW_PROPERTY(showPageIndicator, BOOL)
RCT_EXPORT_VIEW_PROPERTY(transitionStyle, UIPageViewControllerTransitionStyle)

RCT_EXPORT_VIEW_PROPERTY(onPageSelected, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPageScroll, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onPageScrollStateChanged, RCTDirectEventBlock)

-(void) goToPage:(nonnull NSNumber *)reactTag
           index:(nonnull NSNumber *)index
        animated:(BOOL)animated {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        CustomReactNativePageView *view = (CustomReactNativePageView *)viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[CustomReactNativePageView class]]) {
            RCTLogError(@"Cannot find CustomReactNativePageView with tag #%@", reactTag);
            return;
        }
        [view goTo:index.integerValue animated:animated];
    }];
}

RCT_EXPORT_METHOD(setPage:(nonnull NSNumber *)reactTag
                    index:(nonnull NSNumber *)index) {
    [self goToPage:reactTag index:index animated:true];
}

RCT_EXPORT_METHOD(setPageWithoutAnimation:(nonnull NSNumber *)reactTag
                                    index:(nonnull NSNumber *)index) {
    [self goToPage:reactTag index:index animated:false];
}

RCT_EXPORT_METHOD(setScrollEnabled:(nonnull NSNumber *)reactTag
                     scrollEnabled:(BOOL)scrollEnabled) {
    [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
        CustomReactNativePageView *view = (CustomReactNativePageView *)viewRegistry[reactTag];
        if (!view || ![view isKindOfClass:[CustomReactNativePageView class]]) {
            RCTLogError(@"Cannot find CustomReactNativePageView with tag #%@", reactTag);
            return;
        }
        [view shouldScroll:scrollEnabled];
    }];
}

RCT_EXPORT_METHOD(setScrollLocked:(nonnull NSNumber *)reactTag
					 scrollLocked:(BOOL)scrollLocked) {
	[self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
		CustomReactNativePageView *view = (CustomReactNativePageView *)viewRegistry[reactTag];
		if (!view || ![view isKindOfClass:[CustomReactNativePageView class]]) {
			RCTLogError(@"Cannot find CustomReactNativePageView with tag #%@", reactTag);
			return;
		}
		[view setScrollLocked:scrollLocked];
	}];
}

- (UIView *)view {
    return [[CustomReactNativePageView alloc] init];
}

@end
