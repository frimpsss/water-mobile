import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors, fonts, hp, sizes, wp } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { font_styles } from "@/components/core/Text";
import { getGreeting } from "@/utils";
import Overview from "@/components/home/Overview";
import { ScrollView } from "react-native-gesture-handler";
import Today from "@/components/home/Today";
import NavigationComponent from "@/components/home/NotificationsComponent";
export default function Home({ navigation }: any) {
  return (
    <View style={[styles.screen]}>
      <SafeAreaView edges={["top"]}>
        <Text style={[font_styles["p1"], styles.heading]}>
          {getGreeting()},
        </Text>
        <Text style={[font_styles["h3"], styles.name]}>Frimpong</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: hp(20),
            paddingHorizontal: wp(20),
          }}
        >
          <Overview navigation={navigation} />

          <Today navigation={navigation} title={"Today"} />
          <NavigationComponent navigation={navigation} />
          <View style={[{ marginBottom: hp(sizes.screenHeight / 7) }]}></View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black[50],
    flex: 1,
  },
  heading: {
    marginTop: hp(sizes.LG),
    color: colors.white[400],
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  name: {
    color: colors.mantis[950],
    paddingHorizontal: wp(20),
    marginBottom: hp(20),
  },
});
