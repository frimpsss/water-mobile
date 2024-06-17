import { View, Text, FlatList, RefreshControl, StyleSheet } from "react-native";
import React from "react";
import { formatDate, groupByDate } from "@/utils";
import { font_styles } from "../core/Text";
import { colors, hp, screenNames, wp } from "@/constants";
import SingleNotificationTile from "./SingleNotificationTile";
import { CommonActions, useNavigation } from "@react-navigation/native";
interface props {
  isRefetching: boolean;
  refetch: any;
  data: any[];
  navigation?: any;
}
const NotificationList = ({
  isRefetching,
  refetch,
  data,
  navigation,
}: props) => {
  const r = useNavigation();
  return (
    <FlatList
      style={{
        flex: 1,
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
      data={groupByDate(data)}
      renderItem={(e) => {
        return (
          <View style={[styles.group]}>
            <Text style={[font_styles["h6"], styles.date]}>
              {formatDate(new Date(e.item.date))}
            </Text>

            {e.item.notifications.map((e, i) => {
              return (
                <SingleNotificationTile
                  key={i}
                  onPress={() => {
                    r.dispatch(
                      CommonActions.navigate({
                        name: screenNames.notification.single,
                        params: {
                          data: e,
                          back: screenNames.notification.all
                        },
                      })
                    );
                  }}
                  title={e?.title}
                  message={e?.message}
                />
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
    color: colors.black[400],
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

export default NotificationList;
