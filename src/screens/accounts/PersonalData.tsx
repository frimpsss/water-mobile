import { ScrollView, View, StyleSheet } from "react-native";
import React from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import useUserData from "@/hooks/useUserData";
import InputField from "@/components/core/InputField";
import { formatDate } from "@/utils";
import { colors, hp, wp } from "@/constants";

const PersonalData = ({ navigation }: { navigation: any }) => {
  const { userData } = useUserData();
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.goBack();
      }}
      title="Personal Data"
    >
      <View style={[styles.screen]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            {
              gap: hp(20),
              paddingBottom: hp(30)
            },
          ]}
        >
          <InputField
            label={"Name"}
            placeholder={""}
            values={userData}
            errors={[]}
            id={"name"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"Email"}
            placeholder={""}
            values={userData}
            errors={[]}
            id={"email"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"Name"}
            placeholder={""}
            values={userData}
            errors={[]}
            id={"name"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"Phone number"}
            placeholder={""}
            values={userData}
            errors={[]}
            id={"phoneNumber"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"Meter number"}
            placeholder={""}
            values={userData?.meterId}
            errors={[]}
            id={"_id"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"GPS Address"}
            placeholder={""}
            values={userData?.meterId}
            errors={[]}
            id={"gpsAddress"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
          <InputField
            label={"Date Joined"}
            placeholder={""}
            values={{
              date: formatDate(new Date(userData?.createdAt)) ?? " ",
            }}
            errors={[]}
            id={"date"}
            type={"string"}
            handleChange={() => {}}
            handleBlur={() => {}}
            touched={() => {}}
          />
        </ScrollView>
      </View>
    </ScreenWithBackButton>
  );
};
const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: wp(20),
    flex: 1,
    backgroundColor: colors.white[50],

  },
});
export default PersonalData;
