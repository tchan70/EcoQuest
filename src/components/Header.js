import { useRef, useEffect } from "react";
import { Text, StyleSheet, View, Animated, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Header() {
  const cloudPositions = Array.from(
    { length: 7 },
    () => useRef(new Animated.Value(0)).current
  );

  const animateClouds = () => {
    cloudPositions.forEach((position, index) => {
      const startPosition = -200 - index * 50; 
      position.setValue(startPosition);

      const config = {
        toValue: startPosition + 1000, 
        duration: 10000 + Math.random() * 10000,
        delay: Math.random() * 3000,
        useNativeDriver: true,
        isInteraction: false,
      };
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
              width: 40 + Math.random() * 30 * (width / height),
              height: 40 + Math.random() * 30 * (width / height),
              top: 0 + Math.random() * (height * 0.1), 
            },
          ]}
        />
      ))}
      <Text style={styles.title}>
        <Text style={styles.eco}>Eco</Text><Text style={styles.quest}>Quest</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: height * 0.035, 
    paddingBottom: height * 0.02,
    backgroundColor: "#87CEEB",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: height * 0.05, 
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
