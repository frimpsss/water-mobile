import { View, Text } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { screenNames } from "@/constants";
import { CommonActions } from "@react-navigation/native";

const SingleNotificationView = ({ route, navigation }) => {
  const {
    params: { data },
  } = route;
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.goBack()
      }}
    >
      <View>
        <Text>{data?.createdAt}</Text>
        <Text>{data?.title}</Text>
        <Text>{data?.message}</Text>
      </View>
    </ScreenWithBackButton>
  );
};

export default SingleNotificationView;
