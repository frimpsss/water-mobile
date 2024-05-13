import { View, Text } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { screenNames } from "@/constants";

const Register = ({ navigation }: any) => {
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.navigate(screenNames.auth.onboarding);
      }}
    >
      <Text>Sign up</Text>
    </ScreenWithBackButton>
  );
};

export default Register;
