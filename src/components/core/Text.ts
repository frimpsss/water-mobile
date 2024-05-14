import { fonts, hp } from "@/constants";
import { StyleProp, TextStyle } from "react-native";
interface TSyles {
  [key: string]: StyleProp<TextStyle>;
}
export const font_styles: TSyles = {
  p1: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: hp(16),
    lineHeight: hp(24),
    fontWeight: "400", // Regular
  },
  p2: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: hp(14),
    lineHeight: hp(20),
    fontWeight: "400", // Regular
  },
  p3: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: hp(16),
    lineHeight: hp(24),
    fontWeight: "500", // Medium
  },
  p4: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: hp(14),
    lineHeight: hp(20),
    fontWeight: "500", // Medium
  },
  p5: {
    fontFamily: fonts.PoppinsBold,
    fontSize: hp(16),
    lineHeight: hp(24),
    // fontWeight: "700", // Bold
  },
  p6: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 14,
    lineHeight: hp(20),
    // fontWeight: "700", // Bold
  },
  h1: {
    fontFamily: fonts.PoppinsBold,
    fontSize: hp(32),
    lineHeight: hp(40),
    // fontWeight: "700", // Bold
  },
  h2: {
    fontFamily: fonts.PoppinsBold,
    fontSize: hp(28),
    lineHeight: hp(36),
    // fontWeight: "700", // Bold
  },
  h3: {
    fontFamily: fonts.PoppinsBold,
    fontSize: hp(24),
    lineHeight: hp(32),
    // fontWeight: "700", // Bold
  },
  h4: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: hp(20),
    lineHeight: hp(28),
    fontWeight: "500", // Medium
  },
  h5: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: hp(18),
    lineHeight: hp(26),
    fontWeight: "500", // Medium
  },
  h6: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: hp(16),
    lineHeight: hp(24),
    fontWeight: "500", // Medium
  },
};
