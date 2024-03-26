import { StyleSheet, Text, View } from "react-native";
import UserPhoto from "./UserPhoto";

export default function UserDetails({user}) {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{user}</Text>
            <UserPhoto />
            <Text style={styles.points}>USER POINTS</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 10,
        width: 380,
        height: 470,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    points: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: "10%",
    },
});
