import type { MutableRefObject } from "react";
import React, { createContext, useContext, useMemo, useRef } from "react";
import { useSharedValue, type SharedValue } from "react-native-reanimated";

type ScrollableTabViewContext = {
  scrollY: SharedValue<number>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ScrollableTabViewContext = createContext<ScrollableTabViewContext>(
  {} as any
);

type Props = {
  children: React.ReactNode;
};

export const ScrollableTabViewContextProvider = React.memo(
  function ScrollableTabViewContextProvider({ children }: Props) {
    const scrollY = useSharedValue<number>(0);
    const value = useMemo(
      () => ({
        scrollY,
      }),
      []
    );
    return (
      <ScrollableTabViewContext.Provider value={value}>
        {children}
      </ScrollableTabViewContext.Provider>
    );
  }
);

export const useScrollableTabViewContext = () =>
  useContext(ScrollableTabViewContext);
