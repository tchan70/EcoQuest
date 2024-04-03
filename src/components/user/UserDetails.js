import { StyleSheet, Text, View } from "react-native";
import UserPhoto from "./UserPhoto";


export default function UserDetails({user}) {
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
      width: '90%', 
      height: '80%',
      backgroundColor: "#F5F5DC", 
      alignItems: "center",
      justifyContent: "space-evenly", 
      padding: 20, 
      marginTop: 20, 
      elevation: 5,
    },
    text: {
      color: "#228B22", 
      fontWeight: "bold",
      fontSize: 32, 
    },
    points: {
      color: "#8B4513", 
      fontWeight: "bold",
      fontSize: 32,
    },
  })