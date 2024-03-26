import { StyleSheet, Text, View } from "react-native";

export default function SignUpForm() {
    return <View style={styles.view}>
        <Text style={styles.text}>SIGN UP FORM</Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 15,
        width: 360,
        height: 300,
            backgroundColor: 'brown',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '20%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});