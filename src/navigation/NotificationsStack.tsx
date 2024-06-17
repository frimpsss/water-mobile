import { screenNames } from "@/constants";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotifications from "@/screens/notification/AllNotifications";
import SingleNotificationView from "@/screens/notification/SingleNotificationView";
import React from "react";
const Stack = createStackNavigator();
export default function NotificationStack({
  navigation,
}: {
  navigation: any;
  route: any;
}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={AllNotifications}
        name={screenNames.notification.all}
      />
      <Stack.Screen
        component={SingleNotificationView}
        name={screenNames.notification.single}
      />
    </Stack.Navigator>
  );
}
