import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { font_styles } from "@/components/core/Text";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { allNotifications } from "@/api/queries/notifications";
import _ from "lodash";
import { FlatList } from "react-native-gesture-handler";
import { formatDate } from "@/utils";
import { DirectboxNotif } from "iconsax-react-native";
const AllNotifications = ({navigation}:{navigation: any}) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: allNotifications,
  });
  useEffect(() => {
    refetch();
  }, []);
  const groupByDate = (array) => {
    const grouped = _.groupBy(array, (obj) => obj.createdAt.split("T")[0]);
    return Object.keys(grouped).map((date) => ({
      date,
      notifications: grouped[date],
    }));
  };
  return (
    <View style={[styles.screen]}>
      <SafeAreaView edges={["top"]}>
        <Text style={[font_styles["h2"], styles.heading]}>Notification</Text>
      </SafeAreaView>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={groupByDate(data?.data?.data)}
        renderItem={(e) => {
          return (
            <View
              style={[
                {
                  marginVertical: 30,
                  backgroundColor: colors.white[50],
                  padding: hp(15),
                  borderRadius: hp(15),
                },
              ]}
            >
              <Text style={[font_styles["h5"], styles.date]}>
                {formatDate(new Date(e.item.date))}
              </Text>
              <FlatList
                data={e.item.notifications}
                renderItem={(s) => {
                  return (
                    <TouchableOpacity style={[styles.singleNotification]} onPress={() => {
                      navigation.navigate(screenNames.notification.single, s)
                    }}>
                      <View style={[styles.iconBox]}>
                        <View style={[styles.icon]}>
                          <DirectboxNotif color="#fff" size={hp(20)} />
                        </View>
                      </View>
                      <View style={[styles.msg]}>
                        <Text style={[font_styles["h6"], styles.msgTitle]}>
                          {s?.item?.title}
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={[font_styles["p2"], styles.preview]}
                        >
                          {s?.item?.message}...
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black[50],
    flex: 1,
    paddingHorizontal: wp(20),
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  date: {
    color: colors.black[400],
  },
  singleNotification: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
    marginTop: hp(15),
    paddingVertical: hp(5),
  },
  msg: {
    flex: 10,
  },
  iconBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    backgroundColor: colors.mantis[950],
    height: hp(45),
    width: hp(45),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(45 / 2),
  },
  preview: {
    color: colors.black[400],
  },
  msgTitle: {
    color: colors.mantis[950],
  },
});
export default AllNotifications;
