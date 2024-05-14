import { View, Text, StyleSheet } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { font_styles } from "@/components/core/Text";
import InputField from "@/components/core/InputField";

const Register = ({ navigation }: any) => {
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.navigate(screenNames.auth.onboarding);
      }}
    >
      <View style={styles.screen}>
        <Text style={[font_styles["h2"], styles.heading]}>
          Create your account
        </Text>

        <InputField />
      </View>
    </ScreenWithBackButton>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: wp(sizes.LG),
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
  },
});

export default Register;
