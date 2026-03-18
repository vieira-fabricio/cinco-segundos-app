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
    package: "com.fabricio.appquiz",
    versionCode: 1,

    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    }
  },
  extra: {
    eas: {
      projectId: "bc5b766b-cc69-4bfc-a28c-62f816195c17"
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