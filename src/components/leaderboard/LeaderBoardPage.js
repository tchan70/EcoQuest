import { Dimensions, StyleSheet, Text, View } from "react-native"
import LeaderBoardTable from "./LeaderBoardTable"
import DailyLeaderBoard from "./DailyLeaderBoard"
import LeaderBoardSwitch from "./LeaderBoardSwitch"
import { useState } from "react"

const { width, height } = Dimensions.get("window")

const scaleText = (size) => {
    const scaleFactor = Math.min(width / 360, height / 640); 
    return size * scaleFactor;
};

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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: "#F5F5DC",
        padding: 20,
    },
    text: {
        fontWeight: "bold",
        fontSize: scaleText(22), 
        color: '#58a254',
        textAlign: 'center', 
    },
})