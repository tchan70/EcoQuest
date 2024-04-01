import { Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./src/components/home/HomePage.js";
import LeaderBoardPage from "./src/components/leaderboard/LeaderBoardPage.js";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import { useState } from "react";
import Map from "./src/components/map/Map.js";
import UserPage from "./src/components/user/UserPage.js";
import { UserContext } from "./contexts/User.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [questCompleted, setQuestCompleted] = useState(false);
  const [completedQuestReward, setCompletedQuestReward] = useState(0);
  const [user, setUser] = useState({
    emailVerified: true,
    username: "Mantequilla",
    points: 43,
  });
  const [dailyQuest, setDailyQuest] = useState({
    task: "",
    count: 0,
    rewardPoints: 0,
  });

  const decrementLitterCount = () => {
    setDailyQuest((prevQuest) => {
      const newCount = prevQuest.count - 1;
      if (newCount <= 0) {
        completeQuest();
        return { ...prevQuest, count: newCount, isCompleted: true };
      } else {
        return { ...prevQuest, count: newCount };
      }
    });
  };

  const completeQuest = () => {
    setCompletedQuestReward(dailyQuest.rewardPoints);
    setUser((user) => ({
      ...user,
      points: prevUser.points + dailyQuest.rewardPoints,
    }));
    setQuestCompleted(true);
    const newQuest = generateDailyQuest();
    saveDailyQuest(newQuest);
    setDailyQuest({ ...newQuest, isCompleted: false });
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
    const amount = Math.floor(Math.random() * 10) + 1;
    const rewardPoints = Math.floor(Math.random() * 5) + 1;
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
    <UserContext.Provider
      value={{
        user,
        setUser,
        dailyQuest,
        setDailyQuest,
        decrementLitterCount,
        completeQuest,
        saveDailyQuest,
        generateDailyQuest,
        questCompleted,
        formatDate,
        completedQuestReward,
      }}
    >
      <NavigationContainer>
        <Header style={{ flex: 1 }} />
        {user === null || user.emailVerified === false ? (
          <LoginStack />
        ) : (
          <>
            <Tab.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#87CEEB",
                tabBarInactiveTintColor: "white",
                tabBarStyle: {
                  backgroundColor: "#964B00",
                  paddingBottom: 5,
                  height: 60,
                },
              }}
            >
              <Tab.Screen
                name="Home"
                children={() => (
                  <HomePage
                    hasLocationPermission={hasLocationPermission}
                    setHasLocationPermission={setHasLocationPermission}
                  />
                )}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <FontAwesome
                        name="home"
                        size={24}
                        color={focused ? "#87CEEB" : "white"}
                      />
                    );
                  },
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="User"
                component={UserPage}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <FontAwesome
                        name="user"
                        size={24}
                        color={focused ? "#87CEEB" : "white"}
                      />
                    );
                  },
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="LeaderBoard"
                component={LeaderBoardPage}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <MaterialIcons
                        name="leaderboard"
                        size={24}
                        color={focused ? "#87CEEB" : "white"}
                      />
                    );
                  },
                }}
              ></Tab.Screen>
              <Tab.Screen
                name="Map"
                children={() => (
                  <Map
                    hasLocationPermission={hasLocationPermission}
                    setHasLocationPermission={setHasLocationPermission}
                  />
                )}
                options={{
                  tabBarIcon: ({ focused }) => {
                    return (
                      <FontAwesome
                        name="map-marker"
                        size={24}
                        color={focused ? "#87CEEB" : "white"}
                      />
                    );
                  },
                }}
              ></Tab.Screen>
            </Tab.Navigator>
          </>
        )}
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
