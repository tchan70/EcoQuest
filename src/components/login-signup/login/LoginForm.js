import { StyleSheet, Text, View } from "react-native";

export default function LoginForm() {
    return <View style={styles.view}>
        <Text style={styles.text}>LOGIN FORM</Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 15,
        width: 360,
        height: 300,
        backgroundColor: 'lightblue',
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