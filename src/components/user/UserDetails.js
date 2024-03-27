import { StyleSheet, Text, View } from "react-native";
import UserPhoto from "./UserPhoto";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";

export default function UserDetails() {

    const { user } = useContext(UserContext);
    
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{user.email}</Text>
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
