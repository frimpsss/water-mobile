import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { font_styles } from "../core/Text";
import { colors, hp, wp } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

function KTopTabBar({
  state,
  descriptors,
  navigation,
  position,
}: MaterialTopTabBarProps) {
  const inputRange = state.routes.map((_, i) => i);

  const translateX = position.interpolate({
    inputRange,
    outputRange: inputRange.map((i) => {
      return i * (Dimensions.get("screen").width / state.routes.length);
    }),
  });

  return (
    <SafeAreaView edges={["top"]}>
      <View style={styles.tabContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((i) => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
            >
              <Animated.Text
                style={[
                  { opacity, textAlign: "center", color: colors.mantis[950] },
                  font_styles["h5"],
                ]}
              >
                {label as string}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.View
        style={[
          styles.indicator,
          { transform: [{ translateX }] },
          { width: Dimensions.get("screen").width / state.routes.length }, // Width based on number of tabs
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    paddingVertical: hp(10),
    paddingTop: hp(20)
  },
  tabButton: {
    flex: 1,
  },
  indicator: {
    height: 2,
    backgroundColor: colors.mantis[950],
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});

export default KTopTabBar;
