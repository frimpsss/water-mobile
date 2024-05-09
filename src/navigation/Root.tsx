import { screenNames } from "@/constants";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabStack from "./TabStack";
const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen
          component={TabStack}
          name={screenNames.tabs.main}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
