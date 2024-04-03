import { StyleSheet, Text, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
    ref,
    query,
    onValue,
    orderByChild,
    limitToLast,
} from "firebase/database";
import { useEffect, useState } from "react";

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
            <View style={styles.rankList}>
                {isLoading ? (
                    <Text style={styles.loading}>Leaderboard loading...</Text>
                ) : (
                    <>
                        <View style={styles.leaderboardHeader}>
                            <Text style={styles.ranking}>#</Text>
                            <Text style={styles.userHeader}>User</Text>
                            <Text style={styles.pointsHeader}>Points</Text>
                        </View>
                        {topUsersList.map((item, index) => {
                            return (
                                <View
                                    style={styles.leaderboardItem}
                                    key={item.username}
                                >
                                    <Text style={styles.ranking}>
                                        {index + 1}{" "}
                                    </Text>
                                    <Text style={styles.user}>
                                        {item.username}{" "}
                                    </Text>
                                    <Text style={styles.points}>
                                        {item.points}
                                    </Text>
                                </View>
                            );
                        })}
                    </>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        width: 380,
        height: 430,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "2%",
    },
    rankList: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 0,
        width: "85%",
    },
    loading: {
        color: "black",
        fontWeight: "bold",
        fontSize: 25,
        textAlign: "center"
    },
    user: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        width: "70%",
    },
    ranking: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
        width: "15%",
    },

    points: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "right",
        width: "15%",
        paddingRight: 10,
    },
    pointsHeader: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "right",
        width: "30%",
        paddingRight: 10,
    },
    userHeader: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        width: "56%",
    },
    leaderboardHeader: {
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        backgroundColor: "#228B22",
        margin: 5,
    },
    leaderboardItem: {
        flex: 1,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        backgroundColor: "#e6ffe6",
        margin: 3,
    },
});
