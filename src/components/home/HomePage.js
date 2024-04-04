import React from "react"
import { Image, StyleSheet, View, Dimensions } from "react-native";
import LogLitter from "./LogLitter";
import DailyQuest from "./DailyQuest";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window"); 

export default function HomePage({
  hasLocationPermission,
  setHasLocationPermission,
}) {
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        } else {
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
    width: width * 0.65, 
    height: width * 0.65, 
    resizeMode: "contain",
    marginBottom: height * 0.02, 
  },
});
