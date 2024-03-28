import { StyleSheet } from "react-native";
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
import { UserContext, UserProvider } from "./contexts/User.js";

const Tab = createBottomTabNavigator();

export default function App() {
    const [hasNotLoggedIn, setHasNotLoggedIn] = useState(false);
    const [location, setLocation] = useState({latitude: 0, longitude: 0})
    const [user, setUser] = useState(null)
    // set to false in order to go to the main tabs
    // set to false in order to signUp or LogIn

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
                                children={() => <HomePage location={location} setLocation={setLocation}/>}
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
                                children={()=><Map location={location} setLocation={setLocation}/>}
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
