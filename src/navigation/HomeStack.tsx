import { screenNames } from "@/constants";
import { HomeScreen } from "@/screens";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

export default function HomeStack() {
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
    </Stack.Navigator>
  );
}
