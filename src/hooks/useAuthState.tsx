import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { screenNames } from "@/constants";
import { CommonActions, useNavigation } from "@react-navigation/native";

const useAuthNavigation = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const auth = await SecureStore.getItemAsync("auth");
      if (!auth) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenNames.auth.login }],
          })
        );
      }
    });

    return unsubscribe;
  }, [navigation, screenNames]);
};

export default useAuthNavigation;
