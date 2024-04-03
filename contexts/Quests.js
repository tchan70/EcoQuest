import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const QuestContext = createContext();

export const QuestsProvider = ({ children }) => {
  const [questCompleted, setQuestCompleted] = useState(false);
  const [completedQuestReward, setCompletedQuestReward] = useState(0);
  const [rewardDistributed, setRewardDistributed] = useState(false)
  const [dailyQuest, setDailyQuest] = useState({
    task: "",
    count: 0,
    rewardPoints: 0,
  });

  const decrementLitterCount = () => {
    return new Promise((resolve) => {
      setDailyQuest((prevQuest) => {
        const newCount = prevQuest.count - 1;
        setCompletedQuestReward(dailyQuest.rewardPoints);
        if (newCount <= 0) {
          completeQuest();
          resolve(true); 
          return { ...prevQuest, count: newCount, isCompleted: true };
        } else {
          resolve(false); 
          return { ...prevQuest, count: newCount };
        }
      });
    });
  };

  const completeQuest = () => {
    setQuestCompleted(true);
  };

  const saveDailyQuest = async (newQuest) => {
    const today = formatDate(new Date());
    try {
      const questString = JSON.stringify(newQuest);
      await AsyncStorage.setItem(`dailyQuest_${today}`, questString);
    } catch (err) {
      console.error(err, "this is the error in saveDailyQuest");
    }
  };

  const generateDailyQuest = () => {
    setQuestCompleted(false);
    setRewardDistributed(false);
    const amount = Math.floor(Math.random() * 10) + 1;
    const rewardPoints = amount + 3;
    return {
      task: `Pickup ${amount} pieces of litter!`,
      count: amount,
      rewardPoints,
    };
  };

  const formatDate = (date) => {
    let d = new Date(date);
    let day = "" + d.getDate();
    let month = "" + (d.getMonth() + 1);
    let year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return [day, month, year].join("-");
  };

  return (
    <QuestContext.Provider
      value={{
        dailyQuest,
        setDailyQuest,
        decrementLitterCount,
        completeQuest,
        saveDailyQuest,
        generateDailyQuest,
        questCompleted,
        formatDate,
        completedQuestReward,
        rewardDistributed,
        setRewardDistributed,
      }}
    >
      {children}
    </QuestContext.Provider>
  );
};
