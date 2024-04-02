import { StyleSheet, Text, View } from "react-native"
import LeaderBoardTable from "./LeaderBoardTable"
import DailyLeaderBoard from "./DailyLeaderBoard"

export default function LeaderBoard() {
    
    return (
        <View style={styles.view}>
            <DailyLeaderBoard/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: "#F5F5DC"
    }
})