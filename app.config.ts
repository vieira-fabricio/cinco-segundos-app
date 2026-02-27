import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "App Quiz",
  slug: "app-quiz",
  version: "1.0.0",

  icon: "./assets/images/icon.png",

  ios: {
    "bundleIdentifier": "com.appquiz.quiz"
  },

  android: {
    package: "com.appquiz.quiz",

    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },

  plugins: [
    [
      "react-native-google-mobile-ads",
      
      {
        androidAppId: "ca-app-pub-3935068450266170~5377767330",
        iosAppId: "ca-app-pub-3935068450266170~5377767330",
      },
    ],
  ],
};

export default config;