import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./src/components/home/HomePage.js";
import LeaderBoardPage from "./src/components/leaderboard/LeaderBoardPage.js";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import { useState } from "react";
import { UserProvider } from "./contexts/User.js";
import Map from "./src/components/map/Map.js";
import UserPage from "./src/components/user/UserPage.js";
const Tab = createBottomTabNavigator();

export default function App() {
    const [hasNotLoggedIn, setHasNotLoggedIn] = useState(false);
    // set to false in order to go to the main tabs
    // set to false in order to signUp or LogIn

    return (
        <UserProvider>
            <NavigationContainer>
                <Header style={{ flex: 1 }} />
                {hasNotLoggedIn ? (
                    <LoginStack setHasNotLoggedIn={setHasNotLoggedIn} />
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
                                component={UserPage}
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
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flex: 1,
    },
});
