import type { StyleProp, ViewStyle } from "react-native";
import { Text, TouchableOpacity, View } from "react-native";

import { cn } from "../lib/cn";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: "small" | "medium" | "large";
  /** Button contents */
  label: string;
  /** Optional click handler */
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/** Primary UI component for user interaction */
export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  style,
  onPress,
}: ButtonProps) => {
  const buttonClasses = cn(
    // Base button styles
    "rounded-full border-0",
    // Primary/Secondary styles
    primary ? "bg-blue-500" : "bg-transparent border border-gray-300",
    // Size styles
    size === "small" && "py-2.5 px-4",
    size === "medium" && "py-3 px-5",
    size === "large" && "py-3 px-6"
  );

  const textClasses = cn(
    // Base text styles
    "font-bold leading-none",
    // Primary/Secondary text colors
    primary ? "text-white" : "text-gray-800",
    // Size styles
    size === "small" && "text-xs",
    size === "medium" && "text-sm",
    size === "large" && "text-base"
  );

  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View
        className={buttonClasses}
        style={[style, !!backgroundColor && { backgroundColor }]}
      >
        <Text className={textClasses}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
