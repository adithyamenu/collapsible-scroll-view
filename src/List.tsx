import React, { useCallback, useMemo, useRef } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Animated, {
  runOnJS,
  useAnimatedReaction,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import { useScrollableTabViewContext } from "./ScrollableTabViewProvider";
import { HEADER_IMAGE_MINUS_INSET_HEIGHT, TAB_BAR_HEIGHT } from "./constants";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { debounce } from "lodash";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export const List = React.memo(() => {
  const insets = useSafeAreaInsets();
  const ref = useRef<FlatList>(null);
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
  const debouncedScrollToOffset = useMemo(
    () =>
      debounce((result) => {
        ref.current.scrollToOffset({ animated: false, offset: result });
      }, 50),
    []
  );

  const scrollToOffset = useCallback((result: number) => {
    ref.current.scrollToOffset({ animated: false, offset: result });
  }, []);
  useAnimatedReaction(
    () => scrollY.value,
    (result, prev) => {
      // worklet
      if (result === prev) {
        return;
      }
      runOnJS(debouncedScrollToOffset)(result);
    },
    [scrollToOffset]
  );
  return (
    <AnimatedFlatList
      ref={ref}
      data={data}
      renderItem={renderItem}
      onScroll={handleScroll}
      refreshing={true}
      onRefresh={() => {}}
      contentContainerStyle={[
        {
          paddingTop:
            HEADER_IMAGE_MINUS_INSET_HEIGHT + TAB_BAR_HEIGHT - insets.top,
        },
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
