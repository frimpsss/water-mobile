import { Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import ScalingView from "../core/ScaleView";
import { font_styles } from "../core/Text";
import { hp, sizes, wp } from "@/constants";
interface props {
  title: string;
  bgColor: string;
  action: () => void;
  textColor: string;
}
const AuthActionButton = ({ title, bgColor, action, textColor }: props) => {
  return (
    <ScalingView
      animatedScale={0.95}
      extraStyles={{ backgroundColor: bgColor, borderRadius: sizes.LG + 10 }}>
      <Pressable onPress={action} style={[styles.btn]}>
        <Text style={[styles.text, { color: textColor }, font_styles["p3"]]}>
          {title}
        </Text>
      </Pressable>
    </ScalingView>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingVertical: hp(sizes.SM),
  },
  text: {
    textAlign: "center",
  },
});

export default AuthActionButton;
