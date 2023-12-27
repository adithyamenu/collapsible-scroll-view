import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useScrollableTabViewContext } from "./ScrollableTabViewProvider";
import { HEADER_IMAGE_MINUS_INSET_HEIGHT, TAB_BAR_HEIGHT } from "./constants";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const List = React.memo(() => {
  const data = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  const renderItem = useCallback(({ item }) => {
    return <Text style={styles.item}>{item}</Text>;
  }, []);
  const { scrollY } = useScrollableTabViewContext();
  const handleScroll = useAnimatedScrollHandler(
    {
      onScroll(e) {
        scrollY.value = e.contentOffset.y;
      },
    },
    []
  );
  return (
    <AnimatedFlatList
      data={data}
      renderItem={renderItem}
      onScroll={handleScroll}
      contentContainerStyle={[
        { paddingTop: HEADER_IMAGE_MINUS_INSET_HEIGHT + TAB_BAR_HEIGHT },
      ]}
    />
  );
});

const styles = StyleSheet.create({
  item: {
    height: 100,
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    textAlign: "center",
    fontSize: 30,
  },
});
