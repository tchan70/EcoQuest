import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGameContext } from "../../../hooks/useGameContext";

export default function DailyQuest() {
  const [timeLeft, setTimeLeft] = useState("");
  const {
    dailyQuest,
    setDailyQuest,
    saveDailyQuest,
    generateDailyQuest,
    questCompleted,
    formatDate,
    completedQuestReward,
  } = useGameContext();

  useEffect(() => {
    getDailyQuest();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    const diff = endOfDay - now;
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const getDailyQuest = async (forceNewQuest = false) => {
    const today = formatDate(new Date());
    const questString = await AsyncStorage.getItem(`dailyQuest_${today}`);
    if (!questString || forceNewQuest) {
      const newQuest = generateDailyQuest();
      await saveDailyQuest(newQuest);
      setDailyQuest(newQuest);
    } 
    else {
      setDailyQuest(JSON.parse(questString));
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.questHeader}>
        <Text style={styles.headerText}>Daily Quest</Text>
      </View>
      {questCompleted ? (
        <View style={styles.questBody}>
          <Text style={styles.questText}>
            You've finished the quest for the day, you'll receive a new daily
            quest tomorrow!
          </Text>
          <Text style={styles.rewardText}>
            Reward: {completedQuestReward} points
          </Text>
        </View>
      ) : (
        <View style={styles.questBody}>
          <Text style={styles.questText}>{dailyQuest.task}</Text>
          <Text style={styles.questText}>Pieces left: {dailyQuest.count}</Text>
          <Text style={styles.timeLeftText}>Time left: {timeLeft}</Text>
          <Text style={styles.rewardText}>
            Reward: {dailyQuest.rewardPoints} points
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "stretch",
    margin: 20,
    borderRadius: 20,
    backgroundColor: "#e6ffe6",
    elevation: 4,
    overflow: "hidden",
  },
  questHeader: {
    backgroundColor: "#228B22",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  questBody: {
    padding: 20,
    alignItems: "center",
  },
  questText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#228B22",
    marginBottom: 10,
  },
  timeLeftText: {
    fontSize: 18,
    color: "#964B00",
  },
  rewardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#228B22",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
  },
});
