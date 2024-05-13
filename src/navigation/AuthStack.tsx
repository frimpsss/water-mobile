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
const Stack = createStackNavigator();

const AuthStack = () => {

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
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
