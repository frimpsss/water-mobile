import { View, Text, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import * as Icons from "iconsax-react-native";
import { colors, hp, wp } from "@/constants";
import { font_styles } from "../core/Text";
import { TouchableOpacity } from "react-native-gesture-handler";

const SettingsTab = ({
  icon,
  title,
  trailing,
  onTap,
  description,
}: {
  icon: keyof typeof Icons;
  title: string;
  trailing: ReactNode;
  onTap: () => void;
  description?: string;
}) => {
  const IconComponent = Icons[icon];
  return (
    <TouchableOpacity style={styles.tab} onPress={onTap}>
      <View style={styles.leading}>
        <View style={styles.icon}>
          {<IconComponent color={colors.black[950]} size={hp(19)} />}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={[font_styles["h6"]]}>{title}</Text>
        {description && (
          <Text style={[font_styles["p2"], styles.subtext]}>{description}</Text>
        )}
      </View>
      <View style={styles.trailing}>{trailing}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
    padding: hp(10),
  },
  leading: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 10,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  trailing: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  subtext: {
    color: colors.black[300],
  },
  icon: {
    backgroundColor: colors.mantis[50],
    alignItems: "center",
    justifyContent: "center",
    height: hp(50),
    width: hp(50),
    borderRadius: hp(25),
  },
});

export default SettingsTab;
