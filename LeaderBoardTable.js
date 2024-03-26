import { StyleSheet, Text, View } from "react-native"

export default function LeaderBoardTable() {
    return <View style={styles.view}>
        <Text style={styles.text}>LEADERBOARD TABLE</Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        width: 380,
        height: 620,
        backgroundColor: 'turquoise',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '4%',
        borderRadius: 10
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});