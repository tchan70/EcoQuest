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
    rewardDistributed,
    setRewardDistributed,
  } = useContext(QuestContext);

  return {
    user,
    updateUserPoints,
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
  };
};
