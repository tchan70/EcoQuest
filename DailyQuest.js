import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, AsyncStorage } from "react-native";

export default function DailyQuest() {
    const [quest, setQuest] = useState('')
    const [timeLeft, setTimeLeft] = useState('')
    
    useEffect(() => {
        getDailyQuest()
        .then(setQuest)
        setTimeLeft(calculateTimeLeft())
        
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)
        
        return () => clearInterval(timer)
    }, [])
    
    const generateDailyQuest = () => {
        const amount = Math.floor(Math.random() * 10) + 1
        return `Pickup ${amount} pieces of litter!`
    }
    
    const calculateTimeLeft = () => {
        const now = new Date()
        const endOfDay = new Date(now)
        endOfDay.setHours(23, 59, 59, 999)
        const diff = endOfDay - now
    
        let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        let seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
        return `${hours}h ${minutes}m ${seconds}s`
    }

    const formatDate = (date) => {
        let d = new Date(date)
        let day = '' + d.getDate()
        let month = '' + (d.getMonth() + 1)
        let year = d.getFullYear()

        if (day.length < 2) 
            day = '0' + day
        if (month.length < 2) 
            month = '0' + month
      
        return [day, month, year].join('-')
    }

    const saveDailyQuest = async (quest) => {
        const today = formatDate(new Date())
        try {
            await AsyncStorage.setItem(`dailyQuest_${today}`, quest)
        } 
        catch(err) {
            console.error(err, "this is the error in saveDailyQuest")
        }
    }

    const getDailyQuest = async () => {
        const today = formatDate(new Date())
        try {
            const quest = await AsyncStorage.getItem(`dailyQuest_${today}`)
            if (quest !== null) {
                return quest
            }
            const newQuest = generateDailyQuest()
            saveDailyQuest(newQuest)
            return newQuest
        }
        catch(err) {
        console.error(err, "this is the error in getDailyQuest")
        return generateDailyQuest()
        }
    }

    return (
        <View style={styles.view}>
            <Text style={styles.text}>DAILY QUEST AREA</Text>
            <Text style={styles.questText}>{quest}</Text>
            <Text style={styles.timeLeftText}>Time left: {timeLeft}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        width: 280,
        height: 350,
        backgroundColor: 'orangered',
        alignItems: 'center',
        justifyContent: "center",
        marginTop: '10%',
        marginBottom: '30%',
        borderRadius: 10
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 20,
    },
    questText: {
        marginTop: 20,
        color: "white",
        fontSize: 16,
        textAlign: 'center',
    },
    timeLeftText: {
        marginTop: 10,
        color: "yellow",
        fontSize: 14,
    },
})
