import { StyleSheet, Text, View } from "react-native";
import UserDetails from "./UserDetails";
import EditUserButton from "./edit-user/EditUserButton";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";

export default function User({ navigation: { replace } }) {
    const { user } = useContext(UserContext);
    return (
        <View style={styles.view}>
            <Text>User Page!!</Text>
            <UserDetails user={user} />
            <EditUserButton replace={replace} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
});
