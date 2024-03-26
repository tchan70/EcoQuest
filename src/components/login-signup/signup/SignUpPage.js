import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth"


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
                replace('LoginPage')
                alert("Please check your inbox")
            })
            .catch(err => alert('Could not sign up! ' + err.message))
        } else {
            alert("Password and Confirm password are not matching.")
        }
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
            <Button title="Register" onPress={handleSignUp}/>
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
    }
});