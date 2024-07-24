import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { screenNames } from "@/constants";
import { CommonActions, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const useAuthNavigation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const auth = await SecureStore.getItemAsync("auth");
      const user = await AsyncStorage.getItem("user");
      const u = JSON.parse(user);
      if (!auth || !u?.email) {
        // navigation?.dispatch(
        //   CommonActions.navigate({
        //     name: screenNames.auth.main,
        //     params: {
        //       screen: screenNames.auth.login,
        //     },
        //   })
        // );
      }
    });

    return unsubscribe;
  }, [navigation, screenNames]);

  // return null;
};

export default useAuthNavigation;
