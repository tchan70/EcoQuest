import { StyleSheet, Text, View } from "react-native"
import { db } from "../../../firebaseConfig";
import { ref, query, orderByValue, onValue, orderByChild, orderByKey, limitToFirst, limitToLast } from "firebase/database";
import { useEffect, useState } from "react";


export default function LeaderBoardTable() {
    const [topUsersList, setTopUserList] = useState("")

    // const topUsers = ref(db, 'users')
    const queriedUsers = query(ref(db, 'users'), orderByChild('points'))
    useEffect(() => {
        onValue(queriedUsers, (snapshot) => {
            const orderedUsers = [];
            snapshot.forEach((child) => {
                console.log(child.key)
                console.log(child.val())
                orderedUsers.push({ username: child.key, ...child.val() })
            })
            // const data = snapshot.val()
            setTopUserList(orderedUsers)
        })
    }, [])

    console.log(topUsersList);

    return <View style={styles.view}>
        <Text style={styles.text}>LEADERBOARD TABLE</Text>
        <Text style={styles.text}>{JSON.stringify(topUsersList)}</Text>
    </View>
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
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
});