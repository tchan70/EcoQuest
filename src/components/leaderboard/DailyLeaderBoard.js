import { StyleSheet, Text, View } from "react-native";
import { db } from "../../../firebaseConfig";
import {
    ref,
    query,
    onValue,
    orderByChild,
    orderByKey,
    limitToLast,
} from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/User";

export default function DailyLeaderBoard() {
    // const user = "fakeusername"

    const [topUsersList, setTopUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const queriedUsers = query(
        ref(db, `users/fakeusername/`),
        orderByKey(),
        limitToLast(10)
    );

    console.log(queriedUsers)
    const cutoff = Date.now() - 24 * 60 * 60 * 1000
    console.log(cutoff)
    useEffect(() => {
        onValue(queriedUsers, (snapshot) => {
            const orderedUsers = [];
            snapshot.forEach((child) => {
                console.log(child)
                const dailyPoints = Object.keys(child.val().logs)
                dailyPoints.filter((point)=>{
                    return point > cutoff
                })
                orderedUsers.push({username: child.key, points: dailyPoints.length })
            });
            console.log(orderedUsers)
            // orderedUsers.sort()
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
        height: 620,
        backgroundColor: "transparent",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4%",
    },
    rankList: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 50,
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
        margin: 5,
    },
});
