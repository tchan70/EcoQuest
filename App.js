import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./src/components/home/HomePage.js";
import LeaderBoardPage from "./src/components/leaderboard/LeaderBoardPage.js";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import { useState } from "react";
import { UserContext } from "./contexts/User.js";
import UserStack from "./src/components/user/UserStack.js";
import Map from "./src/components/map/Map.js";


const Tab = createBottomTabNavigator();

export default function App() {

    const [user, setUser] = useState(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
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
                                tabBarOptions: { activeTintColor: "green" },
                            }}
                        >
                            <Tab.Screen
                                name="Home"
                                component={HomePage}
                                options={{
                                    tabBarIcon: ({ focused }) => {
                                        return (
                                            <FontAwesome
                                                name="home"
                                                size={24}
                                                color={
                                                    focused ? "green" : "black"
                                                }
                                            />
                                        );
                                    },
                                }}
                            ></Tab.Screen>
                            <Tab.Screen
                                name="User"
                                component={UserStack}
                                options={{
                                    tabBarIcon: ({ focused }) => {
                                        return (
                                            <FontAwesome
                                                name="user"
                                                size={24}
                                                color={
                                                    focused ? "green" : "black"
                                                }
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
                                                color={
                                                    focused ? "green" : "black"
                                                }
                                            />
                                        );
                                    },
                                }}
                            ></Tab.Screen>
                            <Tab.Screen
                                name="Map"
                                component={Map}
                                options={{
                                    tabBarIcon: ({ focused }) => {
                                        return (
                                            <FontAwesome
                                                name="map-marker"
                                                size={24}
                                                color={
                                                    focused ? "green" : "black"
                                                }
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
