export default {
  expo: {
    name: "AquaTrack",
    slug: "water-management",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.aaffrrimps.waterManagement",
      googleServicesFile: "./GoogleService-info.plist",
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.aaffrrimps.waterManagement",
      softwareKeyboardLayoutMode: "pan",
      googleServicesFile: "./google-services.json",
      usesCleartextTraffic: true,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    image: "latest",
    plugins: [
      "expo-font",
      "expo-secure-store",
      "@react-native-firebase/app",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
          android: {
            usesCleartextTraffic: true,
          },
        },
      ],
    ],
  },
};
