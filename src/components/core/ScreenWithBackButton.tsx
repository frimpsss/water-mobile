import { colors, hp, sizes, wp } from "@/constants";
import { ArrowLeft } from "iconsax-react-native";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { font_styles } from "./Text";
interface props {
  onBackClick: () => void;
  title?: string;
  children: React.ReactNode;
}
const ScreenWithBackButton = ({ onBackClick, title, children }: props) => {
  return (
    <View style={styles.screen}>
      <SafeAreaView edges={['top']}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.iconContainer} onPress={onBackClick}>
            <ArrowLeft color={colors.black[950]} />
          </TouchableOpacity>

          <Text style={[font_styles["h5"]]}>{title}</Text>
        </View>
      </SafeAreaView>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white[50],
    flex: 1,
  },
  title: {},
  headerContainer: {
    paddingHorizontal: wp(sizes.MD),
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(sizes.SM),
  },
  iconContainer: {
    position: "absolute",
    height: "100%",
    left: wp(sizes.MD),
    bottom: 0,
    top: hp(sizes.SM),
    alignItems: "center",
    justifyContent: "center",
    padding: hp(1),
  },
});

export default ScreenWithBackButton;
