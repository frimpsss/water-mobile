import { screenNames } from "@/constants";
import useAuthNavigation from "@/hooks/useAuthState";
import { useFetchUserInfo } from "@/hooks/useFetchUserData";
import { HomeScreen } from "@/screens";
import ConsumptionData from "@/screens/home/ConsumptionData";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
const Stack = createStackNavigator();

export default function HomeStack({ navigation }) {
  const { refetch, isFetching, isError } = useFetchUserInfo();
  useEffect(() => {
    refetch();
  }, [refetch, isFetching]);
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
