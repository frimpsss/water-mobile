import { screenNames } from "@/constants";
import useAuthNavigation from "@/hooks/useAuthState";
import { HomeScreen } from "@/screens";
import ConsumptionData from "@/screens/home/ConsumptionData";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  useAuthNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        component={HomeScreen}
        name={screenNames.home.initialScreen}
      />
      <Stack.Screen
        component={ConsumptionData}
        name={screenNames.home.consumptionDetails}
        options={{}}
      />
    </Stack.Navigator>
  );
}
