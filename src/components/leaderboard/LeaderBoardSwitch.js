import { Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";



export default LeaderBoardSwitch = ({isDailyLeaderboard, setIsDailyLeaderboard}) => {

    const handlePress = () => {
        setIsDailyLeaderboard((currentIsDailyLeaderboard)=>{
            return !currentIsDailyLeaderboard
        })
    }

    return <TouchableOpacity onPress={handlePress} style={styles.leaderBoardButton}>
        <Text>{isDailyLeaderboard ? "View All Time Leaderboard" : "View Daily Leaderboard"}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    leaderBoardButton: {
        borderRadius: 20,
        width: '70%',
        paddingVertical: 12,
        backgroundColor: '#87CEEB',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 3,
    }
})