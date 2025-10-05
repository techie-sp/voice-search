// LinearGradientBackground.tsx
import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

type GradientDirection =
  | "top-to-bottom"
  | "bottom-to-top"
  | "left-to-right"
  | "right-to-left";

interface Props {
  direction?: GradientDirection;
  colors: string[];
  style?: ViewStyle;
  children?: React.ReactNode;
}

const directionMap: Record<
  GradientDirection,
  { start: { x: number; y: number }; end: { x: number; y: number } }
> = {
  "top-to-bottom": { start: { x: 0.5, y: 0 }, end: { x: 0.5, y: 1 } },
  "bottom-to-top": { start: { x: 0.5, y: 1 }, end: { x: 0.5, y: 0 } },
  "left-to-right": { start: { x: 0, y: 0.5 }, end: { x: 1, y: 0.5 } },
  "right-to-left": { start: { x: 1, y: 0.5 }, end: { x: 0, y: 0.5 } },
};

const LinearGradientBackground: React.FC<Props> = React.memo(({
  direction = "top-to-bottom",
  colors,
  style,
  children,
}) => {
  const { start, end } = directionMap[direction];

  return (
    <LinearGradient start={start} end={end} colors={colors} style={[styles.container, style]}>
      {children}
    </LinearGradient>
  );
});

const styles = StyleSheet.create({
  container: {

  },
});

export default LinearGradientBackground;
