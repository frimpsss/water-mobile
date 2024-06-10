import { screenNames } from "@/constants";
import {
  ForgotPassword,
  ForgotPasswordOtp,
  Onboarding,
  Register,
  RegisterOtp,
  SignIn,
} from "@/screens";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
const Stack = createStackNavigator();

const AuthStack = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    if (SecureStore.getItem("auth")) {
      navigation.replace(screenNames.tabs.main);
    }
  }, []);
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={screenNames.auth.onboarding} component={Onboarding} />
      <Stack.Screen name={screenNames.auth.login} component={SignIn} />
      <Stack.Group>
        <Stack.Screen name={screenNames.auth.register} component={Register} />
        <Stack.Screen
          name={screenNames.auth.registerOtp}
          component={RegisterOtp}
        />
      </Stack.Group>

      <Stack.Group>
        <Stack.Screen
          name={screenNames.auth.forgotPwd}
          component={ForgotPassword}
        />
        <Stack.Screen
          name={screenNames.auth.otp}
          component={ForgotPasswordOtp}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;
