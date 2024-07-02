import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { colors, hp, screenNames, wp } from "@/constants";
import { CommonActions } from "@react-navigation/native";
import { font_styles } from "@/components/core/Text";
import { formatDateTime } from "@/utils";

const SingleNotificationView = ({ route, navigation }) => {
  const {
    params: { data },
  } = route;
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.goBack();
      }}
      title="Notification"
    >
      <View style={[styles.screen]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.container]}>
            <Text style={[styles.title, font_styles["h3"]]}>{data?.title}</Text>
            <Text style={[styles.message, font_styles["p1"]]}>
              {data?.message}
            </Text>
            <Text style={[font_styles["p1"], styles.dateTime]}>
              {formatDateTime(data?.createdAt)}
            </Text>
          </View>
        </ScrollView>
      </View>
    </ScreenWithBackButton>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
    backgroundColor: colors.black[50],
    flex: 1,
  },
  dateTime: {
    color: colors.white[500],
  },
  title: {
    color: colors.mantis[950],
    marginBottom: hp(15),
  },
  message: {
    marginBottom: hp(30),
  },
  container: {
    backgroundColor: colors.white[50],
    padding: hp(15),
    borderRadius: hp(10),
  },
});
export default SingleNotificationView;
