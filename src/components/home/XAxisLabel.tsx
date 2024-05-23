import { Text } from "react-native";
import React from "react";
import { font_styles } from "../core/Text";
import { colors, hp } from "@/constants";

const XAxisLabel = ({ text }: { text: string }) => {
  return (
    <Text
      style={[
        font_styles["p2"],
        { color: colors.white[400], textAlign: "center", fontSize: hp(12) },
      ]}
    >
      {text}
    </Text>
  );
};

export default XAxisLabel;
