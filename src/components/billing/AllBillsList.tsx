import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import {
  formatDate,
  getMonthAndYear,
  groupByDate,
  groupByMonthAndYear,
  months,
} from "@/utils";
import { font_styles } from "../core/Text";
import { colors, hp, screenNames, wp } from "@/constants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Monero, Speedometer } from "iconsax-react-native";
interface props {
  isRefetching: boolean;
  refetch: any;
  data: any[];
  navigation?: any;
}
const BillList = ({ isRefetching, refetch, data, navigation }: props) => {
  const r = useNavigation();
  return (
    <FlatList
      style={{
        flex: 1,
        marginTop: hp(30),
      }}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={() => {
            refetch();
          }}
        />
      }
      showsVerticalScrollIndicator={false}
      data={groupByMonthAndYear(data)}
      renderItem={(e) => {
        return (
          <View style={[styles.group]}>
            <Text style={[font_styles["h6"], { color: colors.black[400] }]}>
              {/* {formatDate(new Date(e.item.dat))} */}
              {e.item.date}
            </Text>

            {e.item.bills.map((e, i) => {
              return (
                <Pressable
                  onPress={() => {
                    r.dispatch(
                      CommonActions.navigate({
                        name: screenNames.billing.single_bill,
                        params: {
                          data: e,
                          back: screenNames.notification.all,
                        },
                      })
                    );
                  }}
                  key={i}
                  style={[
                    {
                      flexDirection: "row",
                      alignItems: "center",
                      gap: wp(10),
                      marginTop: hp(15),
                      paddingVertical: hp(5),
                      flex: 1,
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        flex: 2,
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      },
                    ]}
                  >
                    <View
                      style={[
                        {
                          backgroundColor: colors.clementine[600],
                          height: hp(45),
                          width: hp(45),
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: hp(45 / 2),
                        },
                      ]}
                    >
                      <Speedometer height={hp(20)} color="#fff" />
                    </View>
                  </View>
                  <View
                    style={[
                      {
                        flex: 10,
                        alignSelf: "center",
                        justifyContent: "flex-start",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          color: colors.mantis[950],
                        },
                        font_styles["h6"],
                      ]}
                    >
                      Bill for{" "}
                      {months[getMonthAndYear(e?.billingPeriodStart).month]} -
                      {getMonthAndYear(e?.billingPeriodStart).year}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  date: {
    color: "#000",
  },
  group: {
    backgroundColor: colors.white[50],
    paddingHorizontal: hp(15),
    paddingTop: hp(15),
    borderRadius: hp(15),
    marginBottom: hp(15),
    paddingBottom: hp(25),
  },
});

export default BillList;
