import { View, Text } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { screenNames } from "@/constants";

const SignIn = ({ navigation }) => {
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.navigate(screenNames.auth.onboarding);
      }}
    >
      <Text>SignIn page</Text>
    </ScreenWithBackButton>
  );
};

export default SignIn;
