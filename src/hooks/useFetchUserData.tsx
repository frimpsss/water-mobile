import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/api/queries/user";

export const useFetchUserInfo = () => {
  const { data, isFetching, isError, refetch } = useQuery({
    queryKey: ["user-info"],
    queryFn: getUserInfo,
    enabled: false,
  });

  useEffect(() => {
    const fetchAuthAndUserInfo = async () => {
      const auth = await AsyncStorage.getItem("auth");
      if (auth) {
        refetch();
      }
    };

    fetchAuthAndUserInfo();
  }, [refetch]);

  useEffect(() => {
    const storeUserData = async () => {
      if (!isFetching && !isError && data?.data?.data) {
        await AsyncStorage.setItem("user", JSON.stringify(data.data.data));
      }
    };

    storeUserData();
  }, [isFetching, isError, data]);

  return { data, isFetching, isError, refetch };
};
