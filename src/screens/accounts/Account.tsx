import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, hp, sizes, wp, screenNames } from "@/constants";
import SettingsTab from "@/components/settings/SettingsTab";
import { ArrowRight2 } from "iconsax-react-native";
import Profile from "@/components/settings/Profile";
import { font_styles } from "@/components/core/Text";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";
import useUserData from "@/hooks/useUserData";
const Account = ({ navigation }: any) => {
  const { userData } = useUserData();
  return (
    <View style={[styles.screen]}>
      <SafeAreaView>
        <Text style={[font_styles["h2"], styles.heading]}>Settings</Text>
        <View style={styles.profile}>
          <Profile
            name={userData?.name ?? ""}
            meterId={userData?.meterId?._id ?? ""}
          />
        </View>
      </SafeAreaView>
      <ScrollView style={[styles.sv]}>
        <View style={styles.tabs}>
          <SettingsTab
            icon={"UserOctagon"}
            title={"Personal Data"}
            trailing={
              <ArrowRight2
                color={colors.mantis[950]}
                variant="Linear"
                size={hp(24)}
              />
            }
            onTap={() => {
              navigation.navigate(screenNames.accounts.personalInfo);
            }}
            description={"View and edit personal data."}
          />
          <SettingsTab
            icon={"TableDocument"}
            title={"Report"}
            trailing={
              <ArrowRight2
                color={colors.mantis[950]}
                variant="Linear"
                size={hp(24)}
              />
            }
            onTap={() => {}}
            description={"Have an issue? File a report to our team."}
          />
          <SettingsTab
            icon={"Notification"}
            title={"Notification"}
            trailing={<Switch />}
            onTap={() => {}}
          />
          <SettingsTab
            icon={"Activity"}
            title={"Account"}
            trailing={
              <ArrowRight2
                color={colors.mantis[950]}
                variant="Linear"
                size={hp(24)}
              />
            }
            onTap={async () => {}}
            description={"Manage your account"}
          />
          <SettingsTab
            icon={"LoginCurve"}
            title={"Log out"}
            trailing={
              <ArrowRight2
                color={colors.mantis[950]}
                variant="Linear"
                size={hp(24)}
              />
            }
            onTap={async () => {
              await SecureStore.deleteItemAsync("auth");

              navigation.replace(screenNames.auth.main);
            }}
          />
        </View>
        <Text style={[font_styles["p1"], styles.versionText]}>v1.00.1</Text>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.black[50],
    flex: 1,
  },
  tabs: {
    backgroundColor: colors.white[50],
    padding: hp(10),
    borderRadius: hp(24),
    gap: hp(5),
  },
  sv: {
    paddingHorizontal: wp(20),
    paddingTop: Platform.select({ android: hp(24), ios: 0 }),
  },
  profile: {
    backgroundColor: colors.white[50],
    padding: hp(10),
    borderRadius: hp(24),
    marginHorizontal: wp(20),
  },
  versionText: {
    textAlign: "center",
    marginTop: hp(10),
    color: colors.black[400],
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
    paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
});
export default Account;
