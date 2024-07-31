import { View, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import BillList from "@/components/billing/AllBillsList";
import { useQuery } from "@tanstack/react-query";
import { allBills } from "@/api/queries/finance";
import { colors, hp, sizes, wp } from "@/constants";
import EmptyStateComponent from "@/components/core/EmptyStateComponent";
const BillingScreen = () => {
  const { isFetching, data, refetch, isRefetching } = useQuery({
    queryFn: allBills,
    queryKey: ["all-bills"],
  });
  useEffect(() => {
    refetch();
  }, []);

  return (
    <View style={[styles.screen]}>
      {isFetching && <ActivityIndicator />}
      {!isFetching && data?.data?.data?.length == 0 ? (
        <EmptyStateComponent text="No Bills found" />
      ) : (
        <BillList
          isRefetching={isRefetching}
          refetch={refetch}
          data={data?.data?.data}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.white[50],
    flex: 1,
    paddingHorizontal: wp(20),
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
    // paddingHorizontal: wp(20),
    paddingTop: hp(20),
  },
  date: {
    color: colors.black[400],
  },
  singleNotification: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(10),
    marginTop: hp(15),
    paddingVertical: hp(5),
    flex: 1,
  },
  msg: {
    flex: 10,
  },
  iconBox: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  icon: {
    backgroundColor: colors.mantis[950],
    height: hp(45),
    width: hp(45),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: hp(45 / 2),
  },
  preview: {
    color: colors.black[400],
  },
  msgTitle: {
    color: colors.mantis[950],
  },
  group: {
    backgroundColor: colors.white[50],
    padding: hp(15),
    borderRadius: hp(15),
    marginBottom: hp(15),
  },
});
export default BillingScreen;
