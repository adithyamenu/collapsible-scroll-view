import React, { useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text } from "react-native";

export const List = React.memo(() => {
  const data = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  const renderItem = useCallback(({ item }) => {
    return <Text style={styles.item}>{item}</Text>;
  }, []);
  return <FlatList data={data} renderItem={renderItem} />;
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
