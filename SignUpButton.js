import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function SignUp({replace}) {
    function handleSignUpClick() {
    replace('SignUpPage')
    }
    
    return <>
        <TouchableOpacity onPress={handleSignUpClick} style={styles.signUpButton}>
            <Text style={styles.text}>SIGN UP</Text>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    signUpButton: {
        borderWidth: 5,
        borderRadius: 15,
        width: 200,
        height: 160,
            backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '25%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});