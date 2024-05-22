import { screenNames } from "@/constants";
import { createStackNavigator } from "@react-navigation/stack";
import AllNotifications from "@/screens/notification/AllNotifications";
const Stack = createStackNavigator();
export default function NotificationStack() {
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
    </Stack.Navigator>
  );
}
