import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "../home/HomePage";
import LeaderBoardPage from "../leaderboard/LeaderBoardPage";
import UserPage from "../user/UserPage";
import Map from "../map/Map";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const MainTabNavigator = ({
  hasLocationPermission,
  setHasLocationPermission,
  setIsUsernameCreated,
}) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#87CEEB",
        tabBarInactiveTintColor: "white",
        tabBarStyle: {
          backgroundColor: "#a15d29",
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
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="home"
              size={24}
              color={focused ? "#87CEEB" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        children={() => (
          <UserPage setIsUsernameCreated={setIsUsernameCreated} />
        )}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? "#87CEEB" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoardPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="leaderboard"
              size={24}
              color={focused ? "#87CEEB" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        children={() => (
          <Map
            hasLocationPermission={hasLocationPermission}
            setHasLocationPermission={setHasLocationPermission}
          />
        )}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="map-marker"
              size={24}
              color={focused ? "#87CEEB" : "white"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
