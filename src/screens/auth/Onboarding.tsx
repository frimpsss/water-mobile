import { View, Text, StyleSheet } from "react-native";
import React from "react";
import AuthActionButton from "@/components/auth/AuthActionButton";
import { colors, hp, screenNames, sizes, wp } from "@/constants";

const Onboarding = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <View style={styles.illustration}>
        <Text>hi</Text>
      </View>
      <View style={styles.buttons}>
        <AuthActionButton
          title="Signin"
          action={() => {
            navigation.navigate(screenNames.auth.login);
          }}
          bgColor={colors.black[950]}
          textColor="#fff"
        />
        <AuthActionButton
          title="Register"
          action={() => {
            navigation.navigate(screenNames.auth.register);
          }}
          bgColor={"#fff"}
          textColor="#000"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  buttons: {
    flex: 3,
    paddingHorizontal: wp(sizes.LG),
    justifyContent: "center",
    width: "100%",
    gap: hp(sizes.LG),
  },
  illustration: {
    flex: 9,
  },
});

export default Onboarding;
