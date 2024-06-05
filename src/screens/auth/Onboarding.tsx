import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import AuthActionButton from "@/components/auth/AuthActionButton";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { font_styles } from "@/components/core/Text";
import { StatusBar } from "expo-status-bar";

const Onboarding = ({ navigation }: any) => {
  return (
    <View style={styles.screen}>
      <View style={styles.illustration}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.img}
        />
      </View>
      <View style={styles.text}>
        <Text style={[styles.textH, font_styles["h2"]]}>
          Welcome to AquaTrack
        </Text>
        <Text style={[styles.textP, font_styles["p1"]]}>
          Manage your water in one place. Pay bills, track usage, and get
          support
        </Text>
      </View>
      <View style={styles.buttons}>
        <AuthActionButton
          title="Sign In"
          action={() => {
            navigation.navigate(screenNames.auth.login);
          }}
          bgColor={colors.mantis[950]}
          textColor="#fff"
        />
        <AuthActionButton
          title="Register"
          action={() => {
            navigation.navigate(screenNames.auth.register);
          }}
          bgColor={"#fff"}
          textColor={colors.mantis[950]}
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
    flex: 4,
    paddingHorizontal: wp(sizes.LG),
    justifyContent: "center",
    width: "100%",
    gap: hp(sizes.LG),
  },
  illustration: {
    flex: 10,
    backgroundColor: colors.mantis[950],
    borderBottomLeftRadius: wp(70),
    borderBottomRightRadius: wp(70),
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    flex: 3,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: wp(sizes.LG),
    gap: hp(sizes.LG),
  },
  textH: {
    textAlign: "center",
    color: colors.mantis[950],
  },
  textP: {
    textAlign: "center",
    paddingHorizontal: wp(sizes.LG) * 2,
    color: colors.mantis[950],
    fontSize: hp(18),
  },
  img: {
    width: wp(140),
    objectFit: "scale-down",
  },
});

export default Onboarding;
