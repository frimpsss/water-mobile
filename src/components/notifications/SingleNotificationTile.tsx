import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { DirectboxNotif } from "iconsax-react-native";
import { font_styles } from "../core/Text";
import { colors, hp, wp } from "@/constants";
interface props {
  onPress: () => void;
  title: string;
  message: string;
}
const SingleNotificationTile = ({ onPress, title, message }: props) => {
  return (
    <Pressable style={[styles.singleNotification]} onPress={onPress}>
      <View style={[styles.iconBox]}>
        <View style={[styles.icon]}>
          <DirectboxNotif color="#fff" size={hp(20)} />
        </View>
      </View>
      <View style={[styles.msg]}>
        <Text numberOfLines={1}  style={[font_styles["h6"], styles.msgTitle]}>{title}</Text>
        <Text numberOfLines={1} style={[font_styles["p2"], styles.preview]}>
          {message}...
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  singleNotification: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
    marginTop: hp(15),
    paddingVertical: hp(5),
    flex: 1,
  },
  msg: {
    flex: 10,
  },
  iconBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    backgroundColor: colors.mantis[950],
    height: hp(45),
    width: hp(45),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(45 / 2),
  },
  preview: {
    color: colors.black[400],
  },
  msgTitle: {
    color: colors.mantis[950],
  },
});

export default SingleNotificationTile;
