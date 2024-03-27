import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { db } from '../../../firebaseConfig'
import { ref, query, orderByValue, onValue, orderByChild, orderByKey, limitToFirst, limitToLast } from 'firebase/database'
import { useEffect, useState } from 'react'

export default function LeaderBoardTable() {
    const [topUsersList, setTopUserList] = useState([])

    // const topUsers = ref(db, 'users')
    const queriedUsers = query(ref(db, 'users'), orderByChild('points'), limitToLast(10))
    useEffect(() => {
        onValue(queriedUsers, (snapshot) => {
            const orderedUsers = []
            snapshot.forEach((child) => {
                console.log(child.key)
                console.log(child.val())
                orderedUsers.unshift({ username: child.key, ...child.val() })
            })
            // const data = snapshot.val()
            setTopUserList(orderedUsers)
        })
    }, [])

    console.log(topUsersList)

    return (
        <View style={styles.view}>
            <Text>LEADERBOARD TABLE</Text>
            <View style={styles.rankList} >
                {topUsersList.map((item, index) => {
                return (
                    <View style={styles.leaderboardItem} key={item.username}>
                        <Text style={styles.ranking}>{index + 1} </Text>
                        <Text style={styles.text}>{item.username} </Text>
                        <Text style={styles.text}>{item.points}</Text>
                    </View>
                )
            })}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        width: 380,
        height: 620,
        backgroundColor: 'turquoise',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '4%',
        borderRadius: 10,
    },
    rankList: {
        flex: 1,
        justifyContent: 'flex-start',
        borderStyle: "solid",
        borderWidth: 2,

    },
    text: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        borderStyle: "dashed",
        borderWidth: 2,

    },
    ranking: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'flex-start',
        backgroundColor: 'pink',
    },

    leaderboardItem: {
        flex: 1,
        flexWrap: 'wrap',
        backgroundColor: 'white',
        marginBottom: 5,
    },
})
