import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LogLitter from "./LogLitter";
import DailyQuest from "./DailyQuest";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";

export default function HomePage({
  hasLocationPermission,
  setHasLocationPermission,
}) {
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        } else {
          console.log("Permission to access location authorized");
          setHasLocationPermission(true);
        }
      })();
    }, [])
  );

  return (
    <View style={styles.view}>
      <DailyQuest style={styles.dailyQuest} />
      <Image
        source={require("../../../assets/EcoQuestLogo.png")}
        style={styles.logo}
      />
      <LogLitter
        style={styles.logLitter}
        hasLocationPermission={hasLocationPermission}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#F5F5DC",
    padding: 20,
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  logLitter: {
    marginTop: 20,
  },
});
