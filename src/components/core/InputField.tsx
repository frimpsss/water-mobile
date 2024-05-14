import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { font_styles } from "./Text";
import { colors, fonts, hp, sizes, wp } from "@/constants";
import { Eye, EyeSlash } from "iconsax-react-native";

const InputField = () => {
  const [blur, setOnBlur] = useState(false);
  const [focus, setOnFocus] = useState(false);
  const [show, setShow] = React.useState(false);
  return (
    <View style={styles.container}>
      <Text style={[styles.label, font_styles["p1"]]}>Name</Text>
      <View>
        <TextInput
          onBlur={() => {
            setOnBlur(true);
            setOnFocus(false);
          }}
          onFocus={() => {
            setOnFocus(true);
          }}
          style={[styles.inputField, focus && styles.onfocus]}
        />
        <Pressable
          style={[styles.icon]}
          onPress={() => {
            setShow(!show);
          }}
        >
          {show ? (
            <Eye size={hp(24)} color={colors.mantis[950]} />
          ) : (
            <EyeSlash size={hp(24)} color={colors.mantis[950]} />
          )}
        </Pressable>
      </View>
      <Text style={[styles.error, font_styles["p2"]]}>Name is required</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    gap: hp(10),
    position: "relative",
  },
  label: {
    color: colors.mantis[950],
  },
  inputField: {
    borderWidth: hp(2),
    borderRadius: hp(10),
    paddingHorizontal: wp(sizes.SM),
    borderColor: colors.black[100],
    paddingVertical: hp(sizes.SM),
    fontSize: sizes.MD,
  },
  onfocus: {
    borderColor: colors.mantis[900],
  },
  error: {
    color: colors.scarlet[600],
    position: "absolute",
    bottom: "-25%",
  },
  icon: {
    position: "absolute",
    right: wp(sizes.SM),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default InputField;
