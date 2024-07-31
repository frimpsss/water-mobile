import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import HomeSectionsLayout from "./HomeSectionsLayout";
import { colors, hp, wp } from "@/constants";
import { font_styles } from "../core/Text";
import useMeterReadingFilter, {
  ItodayStats,
} from "@/hooks/useMeterReadingFilter";
import useUserData from "@/hooks/useUserData";

const Today = ({ navigation, title }: { navigation?: any; title?: string }) => {
  const { userData } = useUserData();
  const { todaysStats } = useMeterReadingFilter({
    meterId: userData?.meterId?._id,
  });

  const [today, setToday] = useState<ItodayStats>({
    amount: 0,
    volume: 0,
  });
  useEffect(() => {
    setToday((p) => {
      return (
        todaysStats || {
          amount: 0,
          volume: 0,
        }
      );
    });
  }, [todaysStats]);
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
          <Text style={[font_styles["h2"], styles.value]} numberOfLines={1}>
            {Number(today?.amount)?.toFixed(2)}
          </Text>
        </View>
        <View style={[styles.view, { paddingLeft: wp(10) }]}>
          <Text style={[font_styles["h5"], styles.unit]}>Liters</Text>
          <Text style={[font_styles["h2"], styles.value]} numberOfLines={1}>
            {Number(today?.volume)?.toFixed(2)}
          </Text>
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
