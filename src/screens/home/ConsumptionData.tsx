import { ScrollView, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { colors, hp, screenNames, wp } from "@/constants";
import { useIsFocused } from "@react-navigation/native";
import { ArrowLeft, ArrowRight } from "iconsax-react-native";
import { formatDate } from "@/utils";
import { font_styles } from "@/components/core/Text";
import CustomAnimatedScale from "@/components/core/ScaleView";
import { LineChart } from "react-native-gifted-charts";
import useMeterReadingFilter from "@/hooks/useMeterReadingFilter";
import useUserData from "@/hooks/useUserData";
import XAxisLabel from "@/components/home/XAxisLabel";
import Today from "@/components/home/Today";

const ConsumptionData = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const [date, setDate] = useState(new Date());
  const [activeCategory, setActiveCategory] = useState("H");
  const categories = ["H", "D", "W", "M"];
  const [viewWidth, setViewWidth] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [max, setmax] = useState(1);
  const { userData } = useUserData();
  const { data, graphMax } = useMeterReadingFilter({
    meterId: userData?.meterId?._id,
    filter: activeCategory,
  });
  const onLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setViewWidth(width);
  };
  useEffect(() => {
    if (data) {
      setChartData(() => {
        return data?.map((e: any) => {
          return {
            value: e?.value,
            labelComponent: () => <XAxisLabel text={e?.time} />,
          };
        });
      });

      if (!Number.isNaN(graphMax)) {
        setmax(graphMax);
      }
    }
  }, [data, activeCategory]);
  React.useLayoutEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: isFocused ? "none" : "flex" } });
  }, [navigation, isFocused]);
  return (
    <ScreenWithBackButton
      title="Consumption"
      onBackClick={() => {
        navigation.navigate(screenNames.home.initialScreen);
      }}
    >
      <View style={[{ backgroundColor: colors.black[50], flex: 1 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: hp(20),
            paddingHorizontal: wp(20),
            backgroundColor: colors.black[50],
          }}
        >
          <View
            style={[
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: hp(10),
              },
            ]}
          >
            <View>
              <CustomAnimatedScale
                action={() => {
                  setDate((prev) => {
                    const y = new Date(prev);
                    return new Date(y.setDate(prev.getDate() - 1));
                  });
                }}
              >
                <ArrowLeft />
              </CustomAnimatedScale>
            </View>
            <View>
              <Text style={[font_styles["p3"], { color: colors.mantis[900] }]}>
                {formatDate(date)}
              </Text>
            </View>
            <View>
              <CustomAnimatedScale
                action={() => {
                  setDate((prev) => {
                    const y = new Date(prev);
                    return new Date(y.setDate(prev.getDate() + 1));
                  });
                }}
              >
                <ArrowRight />
              </CustomAnimatedScale>
            </View>
          </View>

          {formatDate(date) == "Today" ? (
            <View
              style={[
                {
                  backgroundColor: colors.white[50],
                  padding: hp(20),
                  borderRadius: hp(20),
                },
              ]}
            >
              <View style={{ paddingVertical: hp(10), gap: 20 }}>
                <View onLayout={onLayout}>
                  <LineChart
                    yAxisTextStyle={[
                      font_styles.p2,
                      { color: colors.black[300] },
                    ]}
                    xAxisIndicesWidth={10}
                    data={chartData}
                    noOfSections={5}
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
                    showFractionalValues={true}
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginHorizontal: wp(10),
                    borderRadius: hp(10),
                    backgroundColor: colors.white[100],
                  }}
                >
                  {categories.map((e, i) => (
                    <View key={i} style={[{ flex: 1 }, font_styles.p2]}>
                      <CustomAnimatedScale
                        action={() => {
                          setActiveCategory(e);
                        }}
                        extraStyles={[
                          {
                            alignItems: "center",
                            paddingVertical: hp(10),
                            borderRadius: hp(10),
                            justifyContent: "center",
                          },
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
            </View>
          ) : (
            <View
              style={[
                {
                  backgroundColor: colors.white[50],
                  padding: hp(20),
                  borderRadius: hp(20),
                  height: hp(370),
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <Text style={[font_styles["h5"], { color: colors.black[400] }]}>
                No data
              </Text>
            </View>
          )}

          {formatDate(date) == "Today" && <Today />}
        </ScrollView>
      </View>
    </ScreenWithBackButton>
  );
};

export default ConsumptionData;
