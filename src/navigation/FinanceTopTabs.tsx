import KTopTabBar from "@/components/billing/KTopTab";
import BillingScreen from "@/screens/billing/BillingScreen";
import Payments from "@/screens/billing/Payments";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export function FinanceTopTab() {
  return (
    <Tab.Navigator tabBar={(props) => <KTopTabBar {...props} />}>
      <Tab.Screen
        name="bills"
        component={BillingScreen}
        options={{
          tabBarLabel: "Bills",
        }}
      />
      <Tab.Screen
        name="payments"
        component={Payments}
        options={{
          tabBarLabel: "Payments",
        }}
      />
    </Tab.Navigator>
  );
}
