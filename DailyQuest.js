import { StyleSheet, Text, View } from "react-native";

export default function DailyQuest() {
    return <View style={styles.view}>
        <Text style={styles.text}>DAILY QUEST AREA</Text>
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        width: 280,
        height: 350,
        backgroundColor: 'orangered',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '10%',
        marginBottom: '30%',
        borderRadius: 10
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});