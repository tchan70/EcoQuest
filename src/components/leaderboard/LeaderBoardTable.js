import { StyleSheet, Text, View, ScrollView } from "react-native"
import { db } from "../../../firebaseConfig";
import { ref, query, orderByValue, onValue, orderByChild, orderByKey, limitToFirst, limitToLast } from "firebase/database";
import { useEffect, useState } from "react";


export default function LeaderBoardTable() {
    const [topUsersList, setTopUserList] = useState([])

    // const topUsers = ref(db, 'users')
    const queriedUsers = query(ref(db, 'users'), orderByChild('points'), limitToLast(10))
    useEffect(() => {
        onValue(queriedUsers, (snapshot) => {
            const orderedUsers = [];
            snapshot.forEach((child) => {
                console.log(child.key)
                console.log(child.val())
                orderedUsers.unshift({ username: child.key, ...child.val() })
            })
            // const data = snapshot.val()
            setTopUserList(orderedUsers)
        })
    }, [])

    console.log(topUsersList);

    return (
        <ScrollView contentContainerStyle={styles.scrollview}>
            <Text>LEADERBOARD TABLE</Text>
            {topUsersList.map((item, index) => {
                return (<View style={styles.leaderboardItem} key={item.username}>
                    <Text style={styles.ranking}>{index + 1}</Text>
                    <Text style={styles.text}>{item.username}</Text>
                    <Text style={styles.text}>{item.points}</Text>
                </View>)
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        width: 380,
        height: 620,
        backgroundColor: 'turquoise',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '4%',
        borderRadius: 10
    },
    text: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        width: "20%",
        marginBottom: 30
    },
    ranking: {
        color: "black",
        fontWeight: 'bold',
        fontSize: 20,
        width: "30%",
        marginBottom: 30,
        alignItems: "flex-start",
        backgroundColor: 'pink'
    },
    scrollview: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        height: 200
    },
    leaderboardItem: {
        flex: 1,
        flexWrap: "wrap"
        
    }

});