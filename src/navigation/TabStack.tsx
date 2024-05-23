import KTabBar from "@/components/core/KTabBar";
import { screenNames } from "@/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import React from "react";
import BillingStack from "./BillingStack";
import NotificationStack from "./NotificationsStack";
const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => {
        const routeName = props.state.routes[props.state.index].state
        ? props.state.routes[props.state.index].state.routeNames[
            props.state.routes[props.state.index].state.index
          ]
        : props.state.routes[props.state.index].name;
        const visible = ![screenNames.home.consumptionDetails].includes(routeName);
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
