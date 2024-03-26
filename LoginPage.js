import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LoginForm from "./LoginForm";
import { useContext } from "react";
import { UserContext } from "./contexts/User";


export default function LoginPage() {
    const { user, setUser } = useContext(UserContext);
    function handleLoginSubmit() {
       setUser("username logged in")
    }

    return <View style={styles.view}>
        <Text>Login Page!!</Text>
        <LoginForm/>
        <TouchableOpacity onPress={handleLoginSubmit} style={styles.submitButton}>
            <Text style={styles.text}>SUBMIT</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    },
    submitButton: {
        borderWidth: 5,
        borderRadius: 15,
        width: 200,
        height: 100,
            backgroundColor: 'gold',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '10%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});