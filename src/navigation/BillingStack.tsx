import { screenNames } from "@/constants";
import useAuthNavigation from "@/hooks/useAuthState";
import BillingScreen from "@/screens/billing/BillingScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function BillingStack({ navigation }) {
  useAuthNavigation();
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
