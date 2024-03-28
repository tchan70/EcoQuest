import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";


export default function SignUpPage({navigation: {replace}}) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const auth = FIREBASE_AUTH;

    const handleSignUp = () => {
        if (password === confirmPassword) {
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                sendEmailVerification(userCredentials.user)
                alert("Please check your inbox to verify your account! Once you verify it, reload app")
                    replace('LogInOrSignInPage')
            })
            .catch(err => alert('Could not sign up! ' + err.message))
        } else {
            alert("Password and Confirm password are not matching.")
        }
    }

    function handleGoBack() {
        replace("LogInOrSignInPage")
    }

    return (
        <View
            style={styles.view}>
                <Text style={styles.text}>SIGN UP FORM</Text>
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
                <TextInput
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                    placeholder="Confirm password"
                    autoCapitalize="none"
                    secureTextEntry
                />
                <View style={styles.buttons}>
                    <Button title="Register" onPress={handleSignUp}/>
                    <Button color={'grey'} title="Go Back" onPress={handleGoBack}/>
                </View>
        </View>
    )
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