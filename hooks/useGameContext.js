import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { QuestContext } from "../contexts/Quests";

export const useGameContext = () => {
  const { user, updateUserPoints } = useContext(UserContext);
  const {
    dailyQuest,
    setDailyQuest,
    decrementLitterCount,
    completeQuest,
    saveDailyQuest,
    generateDailyQuest,
    questCompleted,
    formatDate,
    completedQuestReward,
  } = useContext(QuestContext);

  const enhancedCompleteQuest = () => {
    console.log(dailyQuest, "this is dailyQuest");
    console.log(dailyQuest.rewardPoints, "this is dailyQuest.rewardPoints");
    updateUserPoints(dailyQuest.rewardPoints);
    completeQuest();
  };

  return {
    user,
    updateUserPoints,
    enhancedCompleteQuest,
    dailyQuest,
    setDailyQuest,
    decrementLitterCount,
    completeQuest,
    saveDailyQuest,
    generateDailyQuest,
    questCompleted,
    formatDate,
    completedQuestReward,
  };
};
