import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, hp, screenNames, wp } from "@/constants";
import { LineChart } from "react-native-gifted-charts";
import { font_styles } from "../core/Text";
import CustomAnimatedScale from "../core/ScaleView";
import HomeSectionsLayout from "./HomeSectionsLayout";
import XAxisLabel from "./XAxisLabel";
import useMeterReadingFilter from "@/hooks/useMeterReadingFilter";

const Overview = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("H");
  const categories = ["H", "D", "W", "M", "Y"];
  const [viewWidth, setViewWidth] = useState(0);
  const [chartData, setChartData] = useState([]);

  const { data, graphMax } = useMeterReadingFilter({
    meterId: "meter-1",
    filter: activeCategory,
  });
  const [max, setmax] = useState(10)

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  useEffect(() => {
    setChartData(() => {
      return data?.map((e: any) => {
        return {
          value: e?.value,
          labelComponent: () => <XAxisLabel text={e?.time} />,
        };
      });
    });
    
    if(!Number.isNaN(graphMax)){
      setmax(graphMax)
    }
  }, [data]);


  return (
    <HomeSectionsLayout
      navigation={navigation}
      title="Consumption"
      morePage={screenNames.home.consumptionDetails}
    >
      <View style={{ paddingVertical: hp(10), gap: 20 }}>
        <View onLayout={onLayout}>
          <LineChart
            yAxisTextStyle={[font_styles.p2, styles.yaxisLabel]}
            xAxisIndicesWidth={10}
            data={chartData}
            noOfSections={3}
            maxValue={max}
            isAnimated
            areaChart
            // hideOrigin
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
            xAxisLength={viewWidth - hp(40)}
          />
        </View>

        <View style={styles.categories}>
          {categories.map((e, i) => (
            <View key={i} style={[styles.category, font_styles.p2]}>
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
                    font_styles.p4,
                    {
                      color:
                        activeCategory === e
                          ? colors.mantis[950]
                          : colors.white[400],
                    },
                  ]}
                >
                  {e}
                </Text>
              </CustomAnimatedScale>
            </View>
          ))}
        </View>
      </View>
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
});

export default Overview;
