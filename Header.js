import { Text, StyleSheet, View } from "react-native"

export default function Header() {
    return (
        <View style={styles.header}>
        <Text>
            <Text style={styles.eco}>Eco</Text>
            <Text>Quest</Text>
        </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        height: 40,
        justifyContent: "flex-end",
        margin: 10
    },
    eco: {
        color: "green"
    }
})