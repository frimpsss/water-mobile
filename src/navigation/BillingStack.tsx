import { screenNames } from "@/constants";
import BillingScreen from "@/screens/billing/BillingScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function BillingStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={BillingScreen}
        name={screenNames.billing.index}
      />
    </Stack.Navigator>
  );
}
