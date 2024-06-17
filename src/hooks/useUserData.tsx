import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
const useUserData = () => {
  const [userData, setUserData] = useState<any>("");
  useEffect(() => {
    const data = SecureStore.getItem("user");
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  return { userData };
};

export default useUserData;
