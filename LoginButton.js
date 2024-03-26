import { StyleSheet, Text, TouchableOpacity } from "react-native";


export default function LoginButton({replace}) {
    return <>
        <TouchableOpacity onPress={()=>{replace('LoginPage')}} style={styles.loginButton}>
            <Text style={styles.text}>LOG IN</Text>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    loginButton: {
        borderWidth: 5,
        borderRadius: 15,
        width: 200,
        height: 160,
        backgroundColor: 'darkblue',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '30%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});