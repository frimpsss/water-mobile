import { screenNames } from "@/constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabStack from "./TabStack";
import AuthStack from "./AuthStack";
import { useEffect, useState } from "react";
const Stack = createStackNavigator();
export default function RootStack() {
  const [initialRouteName, setInitialRouteName] = useState<string>();
  useEffect(() => {
    setInitialRouteName(screenNames.auth.onboarding);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name={screenNames.auth.main} component={AuthStack} />
        <Stack.Screen
          component={TabStack}
          name={screenNames.tabs.main}
          options={{
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
