import {
  View,
  Text,
  StyleSheet,
  Platform,
} from "react-native";
import React, { useRef } from "react";
import ScreenWithBackButton from "@/components/core/ScreenWithBackButton";
import { colors, hp, screenNames, sizes, wp } from "@/constants";
import { font_styles } from "@/components/core/Text";
import { Formik } from "formik";
import { signinvalidator } from "@/utils";
import InputField from "@/components/core/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthActionButton from "@/components/auth/AuthActionButton";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
const SignIn = ({ navigation }) => {
  const formRef = useRef(null);
  return (
    <ScreenWithBackButton
      onBackClick={() => {
        navigation.navigate(screenNames.auth.onboarding);
      }}
    >
      <View style={styles.screen}>
        <Text style={[font_styles["h2"], styles.heading]}>
          Log in to your account
        </Text>
        <Formik
          innerRef={formRef}
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signinvalidator}
          onSubmit={(values) => {}}
        >
          {({ ...form }) => {
            return (
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps={"handled"}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.form}>
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
                    id={"password"}
                    label={"Password"}
                    placeholder={"••••••••"}
                    type={"password"}
                    handleBlur={form.handleBlur("password")}
                    handleChange={form.handleChange("password")}
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
            title="Sign In"
            bgColor={colors.mantis[950]}
            action={() => {
              navigation.navigate(screenNames.tabs.main);
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

export default SignIn;
