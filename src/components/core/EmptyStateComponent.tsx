import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { colors, hp } from "@/constants";
import { font_styles } from "./Text";

const EmptyStateComponent = ({ text }: { text: string }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/empty-state.png")}
        style={styles.image}
      />
      <Text style={[font_styles["p2"], styles.text]}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(20),
  },
  image: { width: hp(100), height: hp(100), objectFit: "scale-down" },
  text: { color: colors.mantis[950] },
});
export default EmptyStateComponent;
