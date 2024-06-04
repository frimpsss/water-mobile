import { View, StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { colors, hp, screenNames, wp } from "@/constants";
import { LineChart } from "react-native-gifted-charts";
import { font_styles } from "../core/Text";
import CustomAnimatedScale from "../core/ScaleView";
import HomeSectionsLayout from "./HomeSectionsLayout";
import XAxisLabel from "./XAxisLabel";
import database from "@react-native-firebase/database";

const Overview = ({ navigation }) => {
  const [viewWidth, setViewWidth] = useState(0);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const meter1Ref = database().ref("/readings/meter-1");
    // To-Do Format Data properly
    const onValueChange = meter1Ref.on("value", (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log("Fetched data: ", data);
        const formattedData = Object.values(data).map((reading: {value: string, timeStamp: string}) => {
          const value = parseFloat(reading.value);
          const timeStamp = `${new Date(reading.timeStamp).getHours()}:${new Date(reading.timeStamp).getMinutes()}`;

          // Validate the data
          if (isNaN(value)) {
            console.error("Invalid data point: ", reading);
            return null;
          }

          return {
            value,
            labelComponent: () => <XAxisLabel text={timeStamp} />,
          };
        }).filter(dataPoint => dataPoint !== null); 

        setChartData(formattedData);
      } else {
        console.log("No data available");
      }
    });

    // Cleanup function
    return () => {
      meter1Ref.off("value", onValueChange);
    };
  }, []);

  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };

  const [activeCategory, setActiveCategory] = useState("H");
  const categories = ["H", "D", "M", "6M", "1Y", "ALL"];

  return (
    <HomeSectionsLayout
      navigation={navigation}
      title="Consumption"
      morePage={screenNames.home.consumptionDetails}
    >
      <View style={{ paddingVertical: hp(10), gap: 20 }} onLayout={onLayout}>
        <LineChart
          yAxisTextStyle={[font_styles.p2, styles.yaxisLabel]}
          xAxisIndicesWidth={10}
          data={chartData}
          noOfSections={3}
          maxValue={6}
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
          // hideYAxisText
          width={viewWidth - wp(30)}
        />

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
