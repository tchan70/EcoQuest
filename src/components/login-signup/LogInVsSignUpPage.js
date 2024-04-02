import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default function LogInVsSignUpPage({ navigation: { replace } }) {

    function handleSignUpClick() {
        replace('SignUpPage')
        }

    function handleLoginClick() {
        replace("LoginPage")
    }


    return (
            <View style={styles.view}>
                <TouchableOpacity onPress={handleLoginClick} style={[styles.button, styles.blue]}>
                <Text style={styles.text}>LOG IN</Text>
            </TouchableOpacity>
                <TouchableOpacity onPress={handleSignUpClick} style={[styles.button, styles.red]}>
                    <Text style={styles.text}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        flexDirection: 'column',
    },
    button: {
        borderWidth: 5,
        borderRadius: 15,
        width: 200,
        height: 160,
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '25%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
    red: {
        backgroundColor: 'red'
    },
    blue: {
        backgroundColor: 'darkblue'
    }
});