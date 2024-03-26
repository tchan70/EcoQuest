import { StyleSheet, View } from "react-native";
import LoginButton from "./login/LoginButton";
import SignUpButton from "./signup/SignUpButton";

export default function LogInOrSignInPage({ navigation: { replace } }) {
    return (
            <View style={styles.view}>
                <LoginButton replace={replace} />
                <SignUpButton replace={replace} />
            </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    }
});