import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserData = () => {
  const [userData, setUserData] = useState<any>("");

  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        setUserData(JSON.parse(data));
      }
    };

    getUserData();
  }, [userData]);

  return { userData };
};

export default useUserData;
