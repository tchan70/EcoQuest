import { View, Text, StyleSheet } from "react-native";

export default function UserPhoto() {
    return <View style={styles.view}>
        <Text style={styles.text}>USER PHOTO</Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 150,
        width: 300,
        height: 300,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '5%',
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});