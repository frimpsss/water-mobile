import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchUserInfo } from "./useFetchUserData";

const useUserData = () => {
  const [userData, setUserData] = useState<any>("");
  const {refetch} = useFetchUserInfo();
  useEffect(() => {
    const getUserData = async () => {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        setUserData(JSON.parse(data));
      } else {
        refetch()
      }
    };

    getUserData();
  }, []);

  return { userData };
};

export default useUserData;
