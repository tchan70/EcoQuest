import { StyleSheet, Text, View } from "react-native"
import LeaderBoardTable from "./LeaderBoardTable"

export default function LeaderBoard() {
    return (
        <View style={styles.view}>
            <Text>Leaderboard Page!!</Text>
            <LeaderBoardTable/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    }
})