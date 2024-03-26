import { StyleSheet, Text, View } from "react-native"

export default function EditUserForm() {
    return <View style={styles.view}>
    <Text style={styles.text}>EDIT USER FORM</Text>
</View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 10,
        width: 380,
        height: 400,
        backgroundColor: "teal",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    }
})