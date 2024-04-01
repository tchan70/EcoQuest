import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomePage from "./src/components/home/HomePage.js";
import LeaderBoardPage from "./src/components/leaderboard/LeaderBoardPage.js";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import { useState, useEffect } from "react";
import Map from "./src/components/map/Map.js";
import UserPage from "./src/components/user/UserPage.js";
import { UserContext } from "./contexts/User.js";
import CreateUser from "./src/components/login-signup/login/CreateUser.js";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const Tab = createBottomTabNavigator();

export default function App() {

    const auth = FIREBASE_AUTH;
    const [user, setUser] = useState(auth.currentUser)

    const [isUsernameCreated, setIsUsernameCreated] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth,  (user) => {
            setUser(user)
            if (user && user.displayName) {
                setIsUsernameCreated(true);
            }
        })
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser }}>
            <NavigationContainer>
                <Header style={{ flex: 1 }} />
                {user === null || user.emailVerified === false ? (
                    <LoginStack />
                ) : !user.displayName ? (
                    <CreateUser setIsUsernameCreated={setIsUsernameCreated}/> ) : (
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
