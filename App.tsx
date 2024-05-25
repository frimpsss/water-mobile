import { RootStack } from "@/navigation";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appReady, setAppReady] = useState(false);
  const fonts = {
    PoppinsBlack: require("./assets/font/Poppins-Black.ttf"),
    PoppinsExtraBoldItalic: require("./assets/font/Poppins-ExtraBoldItalic.ttf"),
    PoppinsExtraLight: require("./assets/font/Poppins-ExtraLight.ttf"),
    PoppinsMedium: require("./assets/font/Poppins-Medium.ttf"),
    PoppinsMediumItalic: require("./assets/font/Poppins-MediumItalic.ttf"),
    PoppinsThinItalic: require("./assets/font/Poppins-ThinItalic.ttf"),
    PoppinsBlackItalic: require("./assets/font/Poppins-BlackItalic.ttf"),
    PoppinsBold: require("./assets/font/Poppins-Bold.ttf"),
    PoppinsBoldItalic: require("./assets/font/Poppins-BoldItalic.ttf"),
    PoppinsExtraBold: require("./assets/font/Poppins-ExtraBold.ttf"),
    PoppinsExtraLightItalic: require("./assets/font/Poppins-ExtraLightItalic.ttf"),
    PoppinsItalic: require("./assets/font/Poppins-Italic.ttf"),
    PoppinsLight: require("./assets/font/Poppins-Light.ttf"),
    PoppinsLightItalic: require("./assets/font/Poppins-LightItalic.ttf"),
    PoppinsRegular: require("./assets/font/Poppins-Regular.ttf"),
    PoppinsSemiBold: require("./assets/font/Poppins-SemiBold.ttf"),
    PoppinsSemiBoldItalic: require("./assets/font/Poppins-SemiBoldItalic.ttf"),
    PoppinsThin: require("./assets/font/Poppins-Thin.ttf"),
  };

  const [fontsLoaded] = useFonts(fonts);

  useEffect(() => {
    (async () => {
      if (fontsLoaded && appReady) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [fontsLoaded, appReady]);

  if (fontsLoaded)
    return (
      <View style={styles.container} onLayout={() => setAppReady(true)}>
        <KeyboardProvider>
          <RootStack />
        </KeyboardProvider>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
