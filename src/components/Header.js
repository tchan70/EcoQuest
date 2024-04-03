import { useRef, useEffect } from "react";
import { Text, StyleSheet, View, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window")

export default function Header() {
  const cloudPositions = Array.from(
    { length: 6 },
    () => useRef(new Animated.Value(0)).current
  );

  const getRandomTimingConfig = (startPosition) => ({
    toValue: startPosition + 1000,
    duration: 10000 + Math.random() * 10000 + Math.random() * 10000,
    delay: Math.random() * 3000,
    useNativeDriver: true,
    isInteraction: false,
  });

  const animateClouds = () => {
    cloudPositions.forEach((position, index) => {
      position.setValue(-200 - index * 50);

      const config = getRandomTimingConfig(-200 - index * 50);
      Animated.loop(Animated.timing(position, config)).start();
    });
  };

  useEffect(() => {
    animateClouds();
  }, []);

  return (
    <View style={styles.header}>
      {cloudPositions.map((position, index) => (
        <Animated.Image
          key={index}
          source={require("../../assets/cloud.png")}
          style={[
            styles.cloud,
            { transform: [{ translateX: position }] },
            {
              width: 40 + Math.random() * 30,
              height: 40 + Math.random() * 30,
              top: 0 + Math.random() * 60,
            },
          ]}
        />
      ))}
      <Text style={styles.title}>
        <Text style={styles.eco}>Eco</Text>
        <Text style={styles.quest}>Quest</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: "#87CEEB",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.075,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  eco: {
    color: "#228B22",
  },
  quest: {
    color: "#3399ff",
  },
  cloud: {
    position: "absolute",
    resizeMode: "contain",
  },
});
