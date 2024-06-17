import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, hp, wp } from "@/constants";
import { font_styles } from "../core/Text";
interface prop {
  name: string;
  meterId: string;
}
const Profile = ({ name, meterId }: prop) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameBox}>
        <Text style={[font_styles["h1"], styles.nameText]}>
          {" "}
          {name
            ?.split(" ")
            ?.map((e: string, i: number, arr: string[]) => {
              if (i == 0 || i == arr.length - 1) {
                return e.charAt(0);
              }
              return "";
            })
            ?.join("")}
        </Text>
      </View>
      <View style={styles.texts}>
        <Text style={[font_styles["p3"]]}>{name}</Text>
        <Text style={[font_styles["p1"], styles.meterNumber]}>{meterId}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(25),
    alignItems: "center",
    justifyContent: "center",
    gap: hp(14),
  },
  nameBox: {
    backgroundColor: colors.mantis[950],
    height: hp(70),
    width: hp(70),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(35),
    includeFontPadding: false,
  },
  nameText: {
    color: colors.white[50],
    fontSize: hp(22),
  },
  meterNumber: {
    color: colors.black[300],
  },
  texts: {
    alignItems: "center",
  },
});

export default Profile;
