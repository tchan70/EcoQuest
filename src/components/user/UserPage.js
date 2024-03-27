import { StyleSheet, Text, View, Button } from "react-native";
import UserDetails from "./UserDetails";
import EditUserButton from "./edit-user/EditUserButton";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

export default function User({ navigation: { replace } }) {

    const { user } = useContext(UserContext);

    function handleLogOut() {
        FIREBASE_AUTH.signOut()
    }

    return (
        <View style={styles.view}>
            <Button title="LogOut" onPress={handleLogOut}/>
            <Text>User Page!!</Text>
            <UserDetails />
            <EditUserButton replace={replace} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
});
