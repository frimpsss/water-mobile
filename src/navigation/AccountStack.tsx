import { screenNames } from "@/constants";
import { AccountScreen } from "@/screens";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const AccountStack = () => {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
      <Stack.Screen
        name={screenNames.accounts.initialScreen}
        component={AccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
