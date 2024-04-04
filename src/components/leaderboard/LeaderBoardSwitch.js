import { Dimensions, Text, TouchableOpacity, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window")

const scaleText = (size) => {
    const scaleFactor = Math.min(width / 360, height / 640); 
    return size * scaleFactor;
};

export default LeaderBoardSwitch = ({isDailyLeaderboard, setIsDailyLeaderboard}) => {

    const handlePress = () => {
        setIsDailyLeaderboard((currentIsDailyLeaderboard)=>{
            return !currentIsDailyLeaderboard
        })
    }

    return <TouchableOpacity onPress={handlePress} style={styles.leaderBoardButton}>
        <Text style={styles.buttonText}>
            {isDailyLeaderboard ? "View All Time Leaderboard" : "View Daily Leaderboard"}
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    leaderBoardButton: {
        borderRadius: 20,
        width: '70%',
        paddingVertical: 12,
        backgroundColor: '#556b2f',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 3,
        marginHorizontal: '15%',
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: scaleText(18), 
        color: 'white', 
    }
});