import { View, Text, StyleSheet } from "react-native";
import React from "react";
import HomeSectionsLayout from "./HomeSectionsLayout";
import { colors, hp, wp } from "@/constants";
import { font_styles } from "../core/Text";

const Today = ({ navigation, title }: { navigation: any; title: string }) => {
  return (
    <HomeSectionsLayout title={title} morePage={""} navigation={navigation}>
      <View style={[styles.container]}>
        <View
          style={[
            styles.view,
            {
              borderRightWidth: wp(2),
              borderColor: colors.black[200],
              paddingRight: wp(10),
            },
          ]}
        >
          <Text style={[font_styles["h5"], styles.unit]}>GHS</Text>
          <Text style={[font_styles["h2"], styles.value]}>202.34</Text>
        </View>
        <View style={[styles.view, { paddingLeft: wp(10) }]}>
          <Text style={[font_styles["h5"], styles.unit]}>Gal</Text>
          <Text style={[font_styles["h2"], styles.value]}>542.43</Text>
        </View>
      </View>
    </HomeSectionsLayout>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: wp(5),
    paddingVertical: hp(10),
    // paddingHorizontal: wp(20),
  },
  container: {
    flexDirection: "row",
  },
  unit: {
    color: colors.black[300],
  },
  value: {
    color: colors.mantis[950],
  },
});

export default Today;
