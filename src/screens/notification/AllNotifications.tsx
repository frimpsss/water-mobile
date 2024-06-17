import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { font_styles } from "@/components/core/Text";
import { colors, hp, sizes, wp } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import { allNotifications } from "@/api/queries/notifications";
import EmptyStateComponent from "@/components/core/EmptyStateComponent";
import NotificationList from "@/components/notifications/NotificationList";
const AllNotifications = ({ navigation }: { navigation: any }) => {
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: allNotifications,
  });

  useEffect(() => {
    refetch();
  }, []);
  return (
    <View style={[styles.screen]}>
      <SafeAreaView edges={["top"]}>
        <Text style={[font_styles["h2"], styles.heading]}>Notification</Text>
      </SafeAreaView>
      {isLoading && <ActivityIndicator />}

      {!isLoading && data?.data?.data?.length == 0 ? (
        <EmptyStateComponent text="No Notifications" />
      ) : (
        <NotificationList
          isRefetching={isRefetching}
          refetch={refetch}
          data={data?.data?.data}
          navigation={navigation}
        />
      )}
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
    flex: 1,
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
  group: {
    backgroundColor: colors.white[50],
    padding: hp(15),
    borderRadius: hp(15),
    marginBottom: hp(15),
  },
});
export default AllNotifications;
