import { View, Text } from "react-native";
import React, { useRef } from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { formatDate } from "@/utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { hp, wp } from "@/constants";
import { font_styles } from "@/components/core/Text";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import useUserData from "@/hooks/useUserData";
import { useMutation } from "@tanstack/react-query";
import { postFinanceStatement } from "@/api/mutations/finance";

const SingleBillScreen = ({ route, navigation }) => {
  const {
    params: { data },
  } = route;

  const { mutate } = useMutation({
    mutationFn: postFinanceStatement,
    mutationKey: ["post-finance-statements"],
    onSuccess(data, variables, context) {
      navigation.goBack();
    },
    onError: (err) => {
      console.error(err);
    },
  });
  const { userData } = useUserData();
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.goBack();
      }}
      title="Bill"
    >
      <View
        style={[
          {
            paddingHorizontal: wp(20),
            paddingTop: hp(20),
          },
        ]}
      >
        <Text style={[{}, font_styles["h5"]]}>Bill Id: #{data?._id}</Text>
        <Text style={[{}, font_styles["h5"]]}>
          Start of Billing Period: {formatDate(data?.billingPeriodStart)}
        </Text>
        <Text style={[{}, font_styles["h5"]]}>
          End of Billing Period: {formatDate(data?.billingPeriodEnd)}
        </Text>
        <Text style={[{}, font_styles["h5"]]}>
          Total amount due: GHS{Number(data?.totalAmountDue).toFixed(2)}
        </Text>
        {data?.tariffs?.map((e, i) => {
          return (
            <View key={i}>
              <Text style={[{}, font_styles["h5"]]}>{e?.tariffId?.name}</Text>
              <Text>{e?.rate}%</Text>
            </View>
          );
        })}

        {data?.status == "UNPAID" && (
          <TouchableOpacity
            onPress={() => paystackWebViewRef.current.startTransaction()}
          >
            <Text>Pay bill</Text>
          </TouchableOpacity>
        )}
      </View>

      <Paystack
        paystackKey="pk_test_e4645b7f21788cc0705f97452d6e72b838213e3c"
        billingEmail={userData?.email}
        amount={100}
        currency="GHS"
        onCancel={(e) => {}}
        onSuccess={(res) => {
          mutate({
            billId: data?._id,
            txnData: res,
          });
        }}
        ref={paystackWebViewRef as any}
      />
    </ScreenWithBackButton>
  );
};

function Tab() {
  return;
}
export default SingleBillScreen;
