import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import React, { useRef } from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { font_styles } from "@/components/core/Text";
import InputField from "@/components/core/InputField";
import { Formik } from "formik";
import { signupvalidator } from "@/utils";
import AuthActionButton from "@/components/auth/AuthActionButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";

const Register = ({ navigation }: any) => {
  const formRef = useRef(null);
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.navigate(screenNames.auth.onboarding);
      }}
    >
      <View style={styles.screen}>
        <Text style={[font_styles["h2"], styles.heading]}>
          Create your account
        </Text>
        <Formik
          innerRef={formRef}
          initialValues={{
            email: "",
            password: "",
            meterNumber: "",
            phoneNumber: "",
            name: "",
            confirmPassword: "",
          }}
          validationSchema={signupvalidator}
          onSubmit={(values) => {}}
        >
          {({ ...form }) => {
            return (
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps={"handled"}
              >
                <View style={[styles.form]}>
                  <InputField
                    id={"name"}
                    label={"Name"}
                    placeholder={"John Mahama"}
                    type={"string"}
                    handleBlur={form.handleBlur("name")}
                    handleChange={form.handleChange("name")}
                    {...form}
                  />
                  <InputField
                    id={"email"}
                    label={"Email"}
                    placeholder={"John Mahama"}
                    type={"string"}
                    handleBlur={form.handleBlur("email")}
                    handleChange={form.handleChange("email")}
                    {...form}
                  />
                  <InputField
                    id={"phoneNumber"}
                    label={"Phone number"}
                    placeholder={"0202010772"}
                    type={"string"}
                    handleBlur={form.handleBlur("phoneNumber")}
                    handleChange={form.handleChange("phoneNumber")}
                    keyboardType="phone-pad"
                    {...form}
                  />
                  <InputField
                    id={"meterNumber"}
                    label={"Meter number"}
                    placeholder={"GWCL-2342341"}
                    type={"string"}
                    handleBlur={form.handleBlur("meterNumber")}
                    handleChange={form.handleChange("meterNumber")}
                    {...form}
                  />
                  <InputField
                    id={"password"}
                    label={"Password"}
                    placeholder={"••••••••"}
                    type={"password"}
                    handleBlur={form.handleBlur("password")}
                    handleChange={form.handleChange("password")}
                    {...form}
                  />
                  <InputField
                    id={"confirmPassword"}
                    label={"Confirm password"}
                    placeholder={"••••••••"}
                    type={"password"}
                    handleBlur={form.handleBlur("confirmPassword")}
                    handleChange={form.handleChange("confirmPassword")}
                    {...form}
                  />
                </View>
              </KeyboardAwareScrollView>
            );
          }}
        </Formik>
      </View>
      <KeyboardStickyView
        style={styles.btn}
        offset={{
          closed: 0,
          opened: Platform.select({
            android: 0,
            ios: hp(35),
          }),
        }}
      >
        <SafeAreaView edges={["bottom"]}>
          <AuthActionButton
            title="Register"
            bgColor={colors.mantis[950]}
            action={() => {
              Alert.alert("Values", JSON.stringify(formRef.current.values));
            }}
            textColor={"#fff"}
          />
        </SafeAreaView>
      </KeyboardStickyView>
    </ScreenWithBackButton>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: wp(sizes.LG),
    position: "relative",
    flex: 1,
  },
  heading: {
    marginVertical: hp(sizes.LG),
    color: colors.mantis[950],
  },
  form: {
    gap: hp(sizes.LG * 1.5),
    marginBottom: hp(sizes.XXL * 5),
    paddingTop: hp(sizes.LG),
  },
  btn: {
    position: "absolute",
    bottom: 0,
    width: sizes.screenWidth - wp(sizes.LG * 2),
    marginHorizontal: wp(sizes.LG),
    marginBottom: hp(sizes.MD),
  },
});

export default Register;
