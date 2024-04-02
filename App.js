import { StyleSheet,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import CreateUser from "./src/components/login-signup/login/CreateUser.js";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { UserProvider } from "./contexts/User.js";
import { QuestsProvider} from "./contexts/Quests.js";
import MainTabNavigator from "./src/components/tab-navigator/MainTabNavigator.js";
import { LoggedInUser }from "./contexts/LoggedInUser.js"


export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const auth = FIREBASE_AUTH;
  const [isUsernameCreated, setIsUsernameCreated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser)


  useEffect(() => {
        onAuthStateChanged(auth,  (user) => {
            setLoggedInUser(user)
            if (loggedInUser && loggedInUser.displayName) {
                setIsUsernameCreated(true);
            }
        })
  }, [])

  function AuthenticatedApp() {
    return loggedInUser === null || loggedInUser.emailVerified === false ? (
      <LoginStack />
    ) : !loggedInUser.displayName ? (
      <CreateUser setIsUsernameCreated={setIsUsernameCreated}/>
    ) : (
      <MainTabNavigator 
        hasLocationPermission={hasLocationPermission} 
        setHasLocationPermission={setHasLocationPermission} 
      />
    )
  }

  return (
    <LoggedInUser.Provider value={{loggedInUser, setLoggedInUser}}>
    <UserProvider>
    <QuestsProvider>
      <NavigationContainer>
        <Header style={{ flex: 1 }} />
        <AuthenticatedApp />
      </NavigationContainer>
    </QuestsProvider>
    </UserProvider>
    </LoggedInUser.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
