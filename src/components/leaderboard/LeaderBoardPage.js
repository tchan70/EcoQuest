import { StyleSheet, Text, View } from "react-native"
import LeaderBoardTable from "./LeaderBoardTable"
import DailyLeaderBoard from "./DailyLeaderBoard"
import LeaderBoardSwitch from "./LeaderBoardSwitch"
import { useState } from "react"

export default function LeaderBoard() {
    const [isDailyLeaderboard, setIsDailyLeaderboard] = useState(false) 
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{!isDailyLeaderboard ? "All Time Leaderboard" : "Daily Leaderboard"}</Text>
            {isDailyLeaderboard ? <DailyLeaderBoard/> : <LeaderBoardTable/> }
            <LeaderBoardSwitch setIsDailyLeaderboard={setIsDailyLeaderboard} isDailyLeaderboard={isDailyLeaderboard}/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: "#F5F5DC"
    },
    text: {
        fontWeight: "bold",
        fontSize: 22,
        marginTop: 15
    }
})