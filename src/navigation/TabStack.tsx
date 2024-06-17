import KTabBar from "@/components/core/KTabBar";
import { screenNames } from "@/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import React, { useEffect } from "react";
import BillingStack from "./BillingStack";
import NotificationStack from "./NotificationsStack";
import * as SecureStorage from "expo-secure-store";
const Tab = createBottomTabNavigator();

export default function TabStack({ navigation }: { navigation: any }) {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      if (!SecureStorage.getItem("auth")) {
        navigation.navigate(screenNames.auth.login);
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const routeName = props?.state?.routes[props?.state?.index].state
          ? props.state?.routes[props?.state?.index]?.state?.routeNames[
              props?.state?.routes?.[props?.state?.index]?.state?.index
            ]
          : props?.state?.routes[props.state.index].name;
        const visible = ![
          screenNames.home.consumptionDetails,
          screenNames.notification.single,
        ].includes(routeName);
        return <KTabBar {...props} visible={visible} />;
      }}
    >
      <Tab.Screen
        component={HomeStack}
        name={screenNames.tabs.initialTab}
        options={{
          title: "Home",
        }}
      />
      <Tab.Screen
        component={BillingStack}
        name={screenNames.tabs.billing}
        options={{
          title: "Finance",
        }}
      />
      <Tab.Screen
        component={NotificationStack}
        name={screenNames.tabs.notification}
        options={{
          title: "Notification",
        }}
      />
      <Tab.Screen
        component={AccountStack}
        name={screenNames.tabs.accoutsTab}
        options={{
          title: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}
