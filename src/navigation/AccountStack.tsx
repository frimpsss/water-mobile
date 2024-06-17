import { screenNames } from "@/constants";
import { AccountScreen } from "@/screens";
import PersonalData from "@/screens/accounts/PersonalData";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const AccountStack = () => {
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
