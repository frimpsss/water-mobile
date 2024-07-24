import axios from "axios";
import { api } from "../config";

export async function postFinanceStatement({
  billId,
  txnData,
}: {
  billId: string;
  txnData: any;
}) {
  try {
    const res = await api({
      method: "post",
      url: "/api/payments/record-payment",
      data: {
        billingId: billId,
        txnData,
      },
    });

    return res;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "An error occurred");
    }
    throw error;
  }
}
