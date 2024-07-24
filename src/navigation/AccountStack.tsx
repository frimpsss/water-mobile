import { screenNames } from "@/constants";
import useAuthNavigation from "@/hooks/useAuthState";
import { useFetchUserInfo } from "@/hooks/useFetchUserData";
import { AccountScreen } from "@/screens";
import PersonalData from "@/screens/accounts/PersonalData";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
const Stack = createStackNavigator();

const AccountStack = ({ navigation }) => {
  // const { refetch, isFetching, isError } = useFetchUserInfo();
  // useEffect(() => {
  //   refetch();
  // }, [refetch, isFetching]);
 //
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={screenNames.accounts.initialScreen}
        component={AccountScreen}
      />
      <Stack.Screen
        name={screenNames.accounts.personalInfo}
        component={PersonalData}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
