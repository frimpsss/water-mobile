import { View, Text, Pressable } from "react-native";
import * as Icons from "iconsax-react-native";
import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, fonts, hp, sizes, wp } from "@/constants";

const KTabBar = ({ descriptors, navigation, state }: BottomTabBarProps) => {
  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        backgroundColor: colors.white[50],
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: colors.white[50],
          paddingBottom: hp(7),
          paddingTop: hp(10),
          width: sizes.screenWidth,
          paddingHorizontal: wp(sizes.screenWidth / 50),
          borderTopColor: colors.black[100],
          borderTopWidth: 0.5,
        }}
      >
        {state.routes.map((route: any, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;
          const isFocused = state.index == index;

          function onPress() {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }
          function onLongPress() {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          }
          function renderIcons(label: string) {
            switch (label) {
              case "Home":
                return (
                  <Icons.Home
                    variant={isFocused ? "Bold" : "Linear"}
                    size={hp(25)}
                    color={!isFocused ? colors.mantis[900] : colors.mantis[400]}
                  />
                );
              case "Accounts":
                return (
                  <Icons.User
                    variant={isFocused ? "Bold" : "Linear"}
                    size={hp(25)}
                    // color={colors.mantis[400]}
                    color={!isFocused ? colors.mantis[900] : colors.mantis[400]}
                  />
                );
              default:
                return (
                  <Icons.Additem
                    size={25}
                    color={isFocused ? colors.mantis[900] : colors.mantis[400]}
                  />
                );
            }
          }
          return (
            <Pressable
              key={index}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flexDirection: "column",
                alignItems: "center",
                gap: hp(5),
                flex: 1,
              }}
            >
              {renderIcons(label)}
              <Text
                style={{
                  fontSize: hp(14),
                  color: isFocused ? colors.mantis[400] : colors.mantis[900],
                  fontWeight: isFocused ? "500" : "300",
                  fontFamily: !isFocused
                    ? fonts.PoppinsLight
                    : fonts.PoppinsRegular,
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default KTabBar;
