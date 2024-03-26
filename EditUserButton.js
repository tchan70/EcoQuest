import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EditUserButton({replace}) {
    return <>
        <TouchableOpacity onPress={()=>{replace("EditUserPage")}} style={styles.editUserButton}>
            <Text style={styles.text}>EDIT USER</Text>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    editUserButton: {
        borderWidth: 5,
        borderRadius: 10,
        width: 380,
        height: 100,
        backgroundColor: "hotpink",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%"
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    }
})