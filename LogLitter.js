import { StyleSheet, Text, View } from "react-native";

export default function LogLitter() {
    return (
        <View style={styles.view}>
            <Text style={styles.text}>LOG LITTER BUTTON</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 38,
        width: 170,
        height: 80,
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontWeight: 'bold'
    },
});
