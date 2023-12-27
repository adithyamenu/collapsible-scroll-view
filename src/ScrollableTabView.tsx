import React, { useCallback } from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { List } from "./List";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { HEADER_IMAGE_MINUS_INSET_HEIGHT, TAB_BAR_HEIGHT } from "./constants";
import {
  ScrollableTabViewContextProvider,
  useScrollableTabViewContext,
} from "./ScrollableTabViewProvider";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }}>
    <List></List>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
    <List></List>
  </View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const _ScrollableTabView = () => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);
  const { scrollY } = useScrollableTabViewContext();

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: Math.max(
            0,
            HEADER_IMAGE_MINUS_INSET_HEIGHT - scrollY.value
          ),
        },
      ],
    }),
    []
  );

  const renderTabBar = useCallback(
    (
      renderTabBarProps: SceneRendererProps & {
        navigationState: NavigationState<Route>;
      }
    ) => (
      <Animated.View style={[animatedStyle, { zIndex: 1 }]}>
        <TabBar {...renderTabBarProps} style={{ height: TAB_BAR_HEIGHT }} />
      </Animated.View>
    ),
    []
  );

  return (
    <>
      <View style={{ height: insets.top }}>
        <View style={{ position: "absolute", top: 0, width: "100%" }}>
          <Animated.View
            style={{
              backgroundColor: "orange",
              height: HEADER_IMAGE_MINUS_INSET_HEIGHT,
            }}
          ></Animated.View>
        </View>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>
  );
};

export const ScrollableTabView = () => {
  return (
    <ScrollableTabViewContextProvider>
      <_ScrollableTabView></_ScrollableTabView>
    </ScrollableTabViewContextProvider>
  );
};
