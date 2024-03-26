import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
    function handleSignUpSubmit() {
        console.log("signed up")
    }

    return <View style={styles.view}>
    <Text>Sign Up Page!!</Text>
    <SignUpForm/>
    <TouchableOpacity onPress={handleSignUpSubmit} style={styles.submitButton}>
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
            backgroundColor: 'darkgrey',
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