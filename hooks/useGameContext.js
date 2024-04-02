import { useContext } from 'react';
import { UserContext } from '../contexts/User';
import { QuestContext } from '../contexts/Quests';

export const useGameContext = () => {
  const { user, updateUserPoints } = useContext(UserContext);
  const { dailyQuest, setDailyQuest, decrementLitterCount, completeQuest, saveDailyQuest, generateDailyQuest, questCompleted, formatDate, completedQuestReward } = useContext(QuestContext);

  const enhancedCompleteQuest = () => {
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
    completedQuestReward
  };
};
