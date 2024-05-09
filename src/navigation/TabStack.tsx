import KTabBar from "@/components/core/KTabBar";
import { screenNames } from "@/constants";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
const Tab = createBottomTabNavigator();

export default function TabStack() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <KTabBar {...props} />}
    >
      <Tab.Screen
        component={HomeStack}
        name={screenNames.tabs.initialTab}
        options={{
          title: "Home",
        }}
      />
            <Tab.Screen
        component={AccountStack}
        name={screenNames.tabs.accoutsTab}
        options={{
          title: "Accounts",
        }}
      />
      
    </Tab.Navigator>
  );
}
