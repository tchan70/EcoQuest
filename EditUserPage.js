import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import EditUserForm from "./EditUserForm";

export default function EditUserPage() {
    function handleEditUserSubmit() {
        console.log("User edited!");
    }

    return (
        <View style={styles.view}>
            <EditUserForm />
            <TouchableOpacity
                onPress={handleEditUserSubmit}
                style={styles.submitButton}
            >
                <Text style={styles.text}>SUBMIT</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
    submitButton: {
        borderWidth: 5,
        borderRadius: 15,
        width: 200,
        height: 100,
        backgroundColor: "saddlebrown",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "10%",
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});
