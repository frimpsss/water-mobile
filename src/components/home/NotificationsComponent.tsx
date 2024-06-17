import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import HomeSectionsLayout from "./HomeSectionsLayout";
import { colors, hp, screenNames, sizes } from "@/constants";
import EmptyStateComponent from "../core/EmptyStateComponent";
import { useQuery } from "@tanstack/react-query";
import { allNotifications } from "@/api/queries/notifications";
import { getCurrentDateInFormat, groupByDate } from "@/utils";
import SingleNotificationTile from "../notifications/SingleNotificationTile";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Back } from "iconsax-react-native";
// import SVG from '../../../assets/images/empty-state.svg'
const Notifications = ({ navigation }) => {
  const r = useNavigation();
  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ["all-notifications"],
    queryFn: allNotifications,
  });

  useEffect(() => {
    refetch();
  }, []);

  const recent = groupByDate(data?.data?.data).filter(
    (e) => e.date == getCurrentDateInFormat()
  );
  return (
    <HomeSectionsLayout
      title={"Recent Notification"}
      morePage={screenNames.notification.all}
      navigation={navigation}
    >
      <View style={[styles.container]}>
        {isLoading && <ActivityIndicator />}
        {!isLoading && recent.length == 0 ? (
          <EmptyStateComponent text={"No recent notifications"} />
        ) : (
          recent?.map((e, i) =>
            e.notifications.map((notif, i) => {
              return (
                <SingleNotificationTile
                  key={i}
                  onPress={function (): void {
                    navigation.navigate(screenNames.tabs.notification);
                  }}
                  title={notif?.title}
                  message={notif?.message}
                />
              );
            })
          )
        )}
      </View>
    </HomeSectionsLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: hp(10),
  },
});

export default Notifications;
