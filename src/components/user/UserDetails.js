import { StyleSheet, Text, View } from "react-native";
import UserPhoto from "./UserPhoto";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";

export default function UserDetails() {
  const { user } = useContext(UserContext);

  return (
    <View style={styles.view}>
      <Text style={styles.text}>{user.username}</Text>
      <UserPhoto />
      <Text style={styles.points}>Points: {user.points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    borderRadius: 20,
    width: "90%",
    height: "60%",
    backgroundColor: "#F5F5DC",
    alignItems: "center",
    justifyContent: "space-evenly",
    elevation: 5,
  },
  text: {
    color: "#84966c",
    fontWeight: "bold",
    fontSize: 30,
  },
  points: {
    color: "#cc9767",
    fontWeight: "bold",
    fontSize: 25,
  },
});
