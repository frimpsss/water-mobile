import { fonts } from "@/constants";
import { StyleProp, TextStyle } from "react-native";
interface TSyles {
  [key: string]: StyleProp<TextStyle>
}
export const font_styles: TSyles = {
  p1: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400", // Regular
  },
  p2: {
    fontFamily: fonts.PoppinsRegular,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400", // Regular
  },
  p3: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500", // Medium
  },
  p4: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500", // Medium
  },
  p5: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700", // Bold
  },
  p6: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700", // Bold
  },
  h1: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700", // Bold
  },
  h2: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700", // Bold
  },
  h3: {
    fontFamily: fonts.PoppinsBold,
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700", // Bold
  },
  h4: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "500", // Medium
  },
  h5: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "500", // Medium
  },
  h6: {
    fontFamily: fonts.PoppinsMedium,
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500", // Medium
  },
};
