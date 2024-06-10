import { View, Text, StyleSheet, Platform } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { font_styles } from "@/components/core/Text";
import { colors, hp, sizes, wp } from "@/constants";

const AllNotifications = () => {
  return (
    <View style={[styles.screen]}>
      <SafeAreaView>
        <Text style={[font_styles["h2"], styles.heading]}>Notification</Text>
      </SafeAreaView>
      <View>
        <View>
          <Text>General</Text>
        </View>
        <View>
          <Text>General</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black[50],
    flex: 1,
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
});
export default AllNotifications;
