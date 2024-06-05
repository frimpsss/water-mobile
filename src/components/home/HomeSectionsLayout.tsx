import { View, StyleSheet, Text } from "react-native";
import React, { ReactNode } from "react";
import { colors, hp, sizes, wp } from "@/constants";
import { font_styles } from "../core/Text";
import CustomAnimatedScale from "../core/ScaleView";
import { ArrowRight2 } from "iconsax-react-native";
interface props {
  title: string;
  children: ReactNode;
  morePage: string;
  navigation: any;
  onLayout?: any
}
const HomeSectionsLayout = ({
  title,
  children,
  morePage,
  navigation,
  onLayout
}: props) => {
  return (
    <View style={styles.container} onLayout={onLayout}>
      <View style={[styles.header]}>
        <Text style={[font_styles["p4"], styles.title]}>{title}</Text>
        {morePage && (
          <CustomAnimatedScale
            action={() => {
              navigation.navigate(morePage);
            }}
            animatedScale={0.97}
            extraStyles={[styles.viewMoreBtn]}
          >
            <Text style={[font_styles["p2"], styles.viewMore]}>More</Text>
            <ArrowRight2 size={hp(15)} color={colors.white[400]} />
          </CustomAnimatedScale>
        )}
      </View>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white[50],
    padding: hp(20),
    borderRadius: hp(20),
    flex: 1,
  },
  title: {
    color: colors.mantis[950],
  },
  viewMore: {
    color: colors.white[400],
  },
  viewMoreBtn: {
    alignItems: "center",
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(10),
  },
});

export default HomeSectionsLayout;
