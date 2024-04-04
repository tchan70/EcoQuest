import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
    ref,
    query,
    onValue,
    orderByChild,
    limitToLast,
} from "firebase/database";
import { useEffect, useState } from "react";

const { width, height } = Dimensions.get("window")

const scaleText = (size) => {
    const scaleFactor = Math.min(width / 360, height / 640); 
    return size * scaleFactor;
};

export default function LeaderBoardTable() {
    const [topUsersList, setTopUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const queriedUsers = query(
        ref(db, "users"),
        orderByChild("points"),
        limitToLast(10)
    );
    useEffect(() => {
        onValue(queriedUsers, (snapshot) => {
            const orderedUsers = [];
            snapshot.forEach((child) => {
                orderedUsers.unshift({ username: child.key, ...child.val() });
            });
            setTopUserList(orderedUsers);
            setIsLoading(false)
        });
    }, []);

    return (
        <View style={styles.view}>
            <ScrollView style={styles.rankList}>
                {isLoading ? (
                    <Text style={styles.loading}>Leaderboard loading...</Text>
                ) : (
                    <>
                        <View style={styles.leaderboardHeader}>
                            <Text style={styles.ranking}>#</Text>
                            <Text style={styles.userHeader}>User</Text>
                            <Text style={styles.pointsHeader}>Points</Text>
                        </View>
                        {topUsersList.map((item, index) => (
                            <View
                                style={styles.leaderboardItem}
                                key={item.username}>
                                <Text style={styles.ranking}>
                                    {index + 1}
                                </Text>
                                <Text style={styles.user}>
                                    {item.username}
                                </Text>
                                <Text style={styles.points}>
                                    {item.points}
                                </Text>
                            </View>
                        ))}
                    </>
                )}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        maxWidth: 380,
        height: height * 0.55, 
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    rankList: {
        width: '95%',
    },
    loading: {
        color: "#228B22",
        fontWeight: "bold",
        fontSize: scaleText(20), 
    },
    ranking: {
        color: "black",
        fontWeight: "bold",
        fontSize: scaleText(24), 
        width: "10%", 
        textAlign: "center", 
    },
    leaderboardHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: "#228B22",
        padding: 10,
        borderRadius: 10,
        marginTop: 10, 
    },
    leaderboardItem: {
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: "#e6ffe6",
        padding: 10,
        marginVertical: 2,
        borderRadius: 10,
    },
    userHeader: {
        color: "black",
        fontWeight: "bold",
        textAlign: "left", 
        fontSize: scaleText(20), 
        width: "50%", 
    },
    pointsHeader: {
        color: "black",
        fontWeight: "bold",
        fontSize: scaleText(20), 
        width: "40%", 
        textAlign: "right", 
        paddingRight: 10, 
    },
    user: {
        color: "black",
        fontWeight: "bold",
        fontSize: scaleText(22), 
        width: "50%", 
        textAlign: "left", 
    },
    points: {
        color: "black",
        fontWeight: "bold",
        fontSize: scaleText(22), 
        width: "40%", 
        textAlign: "right", 
        paddingRight: 10, 
    },
});
