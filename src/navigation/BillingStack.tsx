import { screenNames } from "@/constants";
import useAuthNavigation from "@/hooks/useAuthState";
import BillingScreen from "@/screens/billing/BillingScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { FinanceTopTab } from "./FinanceTopTabs";
import SingleBillScreen from "@/screens/billing/SingleBillScreen";
const Stack = createStackNavigator();

export default function BillingStack({ navigation }) {
  //
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={FinanceTopTab}
        name={screenNames.billing.index}
      />
      <Stack.Screen
        component={SingleBillScreen}
        name={screenNames.billing.single_bill}
      />
    </Stack.Navigator>
  );
}
