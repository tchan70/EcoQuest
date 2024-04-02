import { StyleSheet, Text, View } from "react-native"
import LeaderBoardTable from "./LeaderBoardTable"

export default function LeaderBoard() {
    
    return (
        <View style={styles.view}>
            <LeaderBoardTable/>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: 'center',
        backgroundColor: "#F5F5DC"
    }
})