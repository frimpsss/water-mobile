import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  KeyboardTypeOptions,
} from "react-native";
import React, { useState } from "react";
import { font_styles } from "./Text";
import { colors, fonts, hp, sizes, wp } from "@/constants";
import { Eye, EyeSlash } from "iconsax-react-native";

interface props {
  label: string;
  placeholder: string;
  values: any;
  errors: any;
  id: string;
  type: "string" | "password";
  handleChange: any;
  handleBlur: any;
  touched: any;
  keyboardType?: KeyboardTypeOptions;
}

const InputField = ({
  label,
  placeholder,
  values,
  errors,
  id,
  handleBlur,
  handleChange,
  touched,
  type,
  keyboardType,
}: props) => {
  const [focus, setOnFocus] = useState(false);
  const [show, setShow] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={[styles.label]}>{label}</Text>
      <View>
        <TextInput
          secureTextEntry={type == "password" && !show}
          placeholder={placeholder}
          onEndEditing={handleBlur(id)}
          onBlur={() => {
            setOnFocus(false);
          }}
          keyboardType={keyboardType || "default"}
          onChangeText={handleChange(id)}
          onFocus={() => {
            setOnFocus(true);
          }}
          style={[
            styles.inputField,
            focus && styles.onfocus,
            touched[id] && errors[id] && focus && styles.fieldError,
            touched[id] && errors[id] && !focus && styles.notFocusedFieldError,
          ]}
          value={values[id]}
        />
        <Pressable
          style={[styles.icon]}
          onPress={() => {
            setShow(!show);
          }}
        >
          {type == "password" && (
            <>
              {show && type == "password" ? (
                <Eye size={hp(24)} color={colors.mantis[950]} />
              ) : (
                <EyeSlash size={hp(24)} color={colors.mantis[950]} />
              )}
            </>
          )}
        </Pressable>
      </View>
      {touched[id] && errors[id] && (
        <Text style={[styles.error, font_styles["p2"]]}>{errors[id]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: hp(10),
    position: "relative",
  },
  label: {
    color: colors.mantis[950],
    paddingLeft: wp(2),
    fontFamily: fonts.PoppinsRegular,
    fontSize: hp(18),
    lineHeight: hp(24),
    fontWeight: "400", // Regular
  },
  inputField: {
    borderWidth: hp(2),
    borderRadius: hp(10),
    paddingHorizontal: wp(sizes.SM),
    borderColor: colors.black[200],
    paddingVertical: hp(sizes.SM - 4),
    margin: 0,
    fontSize: hp(sizes.MD),
    fontFamily: fonts.PoppinsRegular,
    includeFontPadding: false,
    color: colors.black[700],
  },
  onfocus: {
    borderColor: colors.mantis[900],
  },
  error: {
    color: colors.scarlet[600],
    position: "absolute",
    bottom: "-27%",
    paddingLeft: wp(5),
    fontFamily: fonts.PoppinsLight,
  },
  icon: {
    position: "absolute",
    right: wp(sizes.SM),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldError: {
    borderColor: colors.scarlet[600],
  },
  notFocusedFieldError: {
    borderWidth: hp(1),
    borderColor: colors.scarlet[600],
  },
});

export default InputField;
