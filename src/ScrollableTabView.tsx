import React from "react";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneMap, TabView } from "react-native-tab-view";
import { List } from "./List";
import Animated from "react-native-reanimated";
import { HEADER_IMAGE_MINUS_INSET_HEIGHT } from "./constants";

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

export const ScrollableTabView = () => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

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
      />
    </>
  );
};
