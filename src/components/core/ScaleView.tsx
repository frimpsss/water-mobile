import React, { useRef } from "react";
import { Animated, ViewStyle, StyleProp } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface CustomAnimatedScaleProps {
  children: React.ReactNode;
  animatedScale?: number;
  extraStyles?: StyleProp<ViewStyle>;
  action: () => void;
}

const CustomAnimatedScale: React.FC<CustomAnimatedScaleProps> = ({
  children,
  animatedScale = 0.95,
  extraStyles,
  action,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: animatedScale,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={action}
      style={[
        {
          transform: [{ scale: scaleValue }],
        },
        extraStyles,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default CustomAnimatedScale;
