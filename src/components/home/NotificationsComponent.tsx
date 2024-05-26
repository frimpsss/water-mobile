import { View, Text, Image } from "react-native";
import React from "react";
import HomeSectionsLayout from "./HomeSectionsLayout";
import { colors, hp, screenNames, sizes } from "@/constants";
import EmptyStateComponent from "../core/EmptyStateComponent";
// import SVG from '../../../assets/images/empty-state.svg'
const Notifications = ({ navigation }: { navigation: any }) => {
  return (
    <HomeSectionsLayout
      title={"Recent Notification"}
      morePage={screenNames.notification.all}
      navigation={navigation}
    >
      <View>
        {/* <SVG /> */}
        <EmptyStateComponent text={"No recent notifications"} />
      </View>
    </HomeSectionsLayout>
  );
};

export default Notifications;
