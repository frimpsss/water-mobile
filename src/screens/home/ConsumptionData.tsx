import { Text } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { screenNames } from "@/constants";
import { useIsFocused } from "@react-navigation/native";

const ConsumptionData = ({ navigation }: any) => {
  const isFocused = useIsFocused();

  React.useLayoutEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: isFocused ? "none" : "flex" } });
  }, [navigation, isFocused]);
  return (
    <ScreenWithBackButton
      title="Consumption"
      onBackClick={() => {
        navigation.navigate(screenNames.home.initialScreen);
      }}
    >
      <Text>hi</Text>
    </ScreenWithBackButton>
  );
};

export default ConsumptionData;
