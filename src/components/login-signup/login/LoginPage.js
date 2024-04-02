import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../contexts/User";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";


export default function LoginPage({ navigation: { replace } }) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = FIREBASE_AUTH;
    const { setUser } = useContext(UserContext);

    function handleLogin() {
        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            setUser(auth.currentUser)
        })
        .catch(err => alert('Could not login! ' + err.message))
    }

    function handleGoBack() {
        replace("LogInOrSignInPage")
    }

    return (
        <View
            style={styles.view}>
                <Text style={styles.text}>LOGIN FORM</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholder="Email"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    autoCapitalize="none"
                    secureTextEntry
                />
                <View style={styles.buttons}>
                    <Button title="Login" onPress={handleLogin}/>
                    <Button color={'grey'} title="Go Back" onPress={handleGoBack}/>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: 360,
        height: 300,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 10,
        margin: 10
    },
    buttons: {
        flexDirection: "row",
        gap: 15
    }
});
