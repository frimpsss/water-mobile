import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { LineChart } from "react-native-gifted-charts";
import { font_styles } from "../core/Text";
import CustomAnimatedScale from "../core/ScaleView";
import HomeSectionsLayout from "./HomeSectionsLayout";
import XAxisLabel from "./XAxisLabel";

const Overview = ({ navigation }: any) => {
  const [viewWidth, setViewWidth] = useState(0);

  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("H");
  const categories = ["H", "D", "M", "6M", "1Y", "ALL"];
  const data = [
    {
      value: 0,
    },
    {
      value: 1,
      labelComponent: () => {
        return <XAxisLabel text="12 Nov" />;
      },
    },
    {
      value: 4,
      labelComponent: () => {
        return <XAxisLabel text="13 Nov" />;
      },
    },
    {
      value: 5,
      labelComponent: () => {
        return <XAxisLabel text="14 Nov" />;
      },
    },
    {
      value: 2,
      labelComponent: () => {
        return <XAxisLabel text="15 Nov" />;
      },
    },
    { value: 3 },
    { value: 1 },
    { value: 4 },
    { value: 5 },
    { value: 2 },
    { value: 3 },
    { value: 1 },
    { value: 4 },
    { value: 5 },
    { value: 2 },
    { value: 3 },
    { value: 1 },
    { value: 4 },
    { value: 5 },
    { value: 2 },
  ];
  return (
    <HomeSectionsLayout
      navigation={navigation}
      title="Consumption"
      morePage={screenNames.home.consumptionDetails}
    >
      <View style={[{ paddingVertical: hp(10), gap: 20 }]} onLayout={onLayout}>
        <LineChart
          yAxisTextStyle={[font_styles["p2"], styles.yaxisLabel]}
          xAxisIndicesWidth={10}
          data={data}
          noOfSections={3}
          maxValue={6}
          isAnimated
          areaChart
          hideOrigin
          color={colors.mantis[950]}
          startFillColor={colors.mantis[100]}
          startOpacity={0.7}
          endOpacity={0.2}
          hideRules
          initialSpacing={5}
          thickness={1}
          xAxisColor={colors.white[300]}
          yAxisColor={colors.white[300]}
          yAxisThickness={0}
          dataPointsColor={colors.mantis[950]}
          hideYAxisText
          width={viewWidth - wp(30)}
        />

        <View style={[styles.categories]}>
          {categories.map((e, i) => {
            return (
              <View key={i} style={[styles.category, font_styles["p2"], ,]}>
                <CustomAnimatedScale
                  action={() => {
                    setActiveCategory(e);
                  }}
                  extraStyles={[
                    styles.cas,
                    {
                      backgroundColor:
                        activeCategory === e
                          ? colors.white[200]
                          : colors.white[100],
                    },
                  ]}
                >
                  <Text
                    style={[
                      font_styles["p4"],
                      styles.catergoryText,
                      {
                        color:
                          activeCategory === e
                            ? colors.black[900]
                            : colors.white[400],
                      },
                    ]}
                  >
                    {e}
                  </Text>
                </CustomAnimatedScale>
              </View>
            );
          })}
        </View>
      </View>
      {/* </View> */}
    </HomeSectionsLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white[50],
    gap: hp(20),
    marginHorizontal: hp(20),
  },
  heading: {},
  yaxisLabel: {
    color: colors.black[300],
  },
  categories: {
    flexDirection: "row",
    // width: '100%',
    marginHorizontal: wp(10),
    borderRadius: hp(10),
    backgroundColor: colors.white[100],
  },
  category: {
    flex: 1,
  },
  cas: {
    alignItems: "center",
    paddingVertical: hp(10),
    borderRadius: hp(10),
    justifyContent: "center",
  },
  catergoryText: {},
});

export default Overview;
