import {
  View,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
  Pressable,
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
  KeyboardController,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { useMutation } from "@tanstack/react-query";
import { logIn } from "@/api/mutations/auth";
import KModal from "@/components/core/KModal";
import * as SecureStrorage from "expo-secure-store";
import * as Burnt from "burnt";

const SignIn = ({ navigation }) => {
  const formRef = useRef(null);
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: logIn,
    onError(error, variables, context) {
      Burnt.toast({
        title: error?.message,
        preset: "error",
        message: error?.message,
      });
    },
    onSuccess(data, variables, context) {
      if (data?.data?.status) {
        SecureStrorage.setItem("auth", data?.data?.data);
        navigation.navigate(screenNames.tabs.main);
      } else {
        Burnt.toast({
          title: "An error occured",
          preset: "error",
          message: data?.data?.message,
        });
      }
    },
    onSettled(data, error, variables, context) {
      formRef.current.resetForm();
    },
  });

  function handleSubmit() {
    if (formRef.current.isValid && formRef.current.dirty) {
      setTimeout(() => {
        mutate({
          email: formRef.current.values.email,
          password: formRef.current.values.password,
        });
      }, 1200);
    } else {
      Object.keys(formRef.current?.values)?.map((f) => {
        formRef.current.setFieldTouched(f, true);
      });
    }
  }

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
              KeyboardController.dismiss();

              handleSubmit();
              // Snackbar.show({
              //   text: 'error?.message',
              //   backgroundColor: colors.scarlet[600],
              //   duration: Snackbar.LENGTH_LONG,
              //   fontFamily:  fonts.PoppinsRegular,

              // })
            }}
            textColor={"#fff"}
          />
        </SafeAreaView>
      </KeyboardStickyView>
      <KModal isOpen={isPending}>
        <View
          style={{
            // alignItems: "center",
            // justifyContent: "center",
            backgroundColor: colors.white[100],
            paddingVertical: 10,
            paddingHorizontal: wp(sizes.screenWidth / 10),
            borderRadius: 20,
          }}
        >
          <ActivityIndicator />
          <Pressable
            onPress={() => {
              // setShowModal(false);
            }}
          >
            <Text style={[font_styles["p3"], { marginTop: 5 }]}>Loading</Text>
          </Pressable>
        </View>
      </KModal>
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
