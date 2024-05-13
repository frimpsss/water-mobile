import React, { useRef, useState } from 'react';
import { TouchableOpacity, Animated, ViewStyle, StyleProp, Text } from 'react-native';

interface CustomAnimatedScaleProps {
  children: React.ReactNode;
  animatedScale?: number;
  extraStyles?: StyleProp<ViewStyle>;
}

const CustomAnimatedScale: React.FC<CustomAnimatedScaleProps> = ({ children, animatedScale = 0.95, extraStyles }) => {
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
    >
      <Animated.View
        style={[
          {
            transform: [{ scale: scaleValue }],
          },
          extraStyles,
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default CustomAnimatedScale;
