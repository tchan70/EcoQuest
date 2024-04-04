import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/LoginStack.js";
import CreateUser from "./src/components/login-signup/CreateUser.js";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import { UserProvider } from "./contexts/User.js";
import { QuestsProvider } from "./contexts/Quests.js";
import MainTabNavigator from "./src/components/tab-navigator/MainTabNavigator.js";
import { LoggedInUser } from "./contexts/LoggedInUser.js";

export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const auth = FIREBASE_AUTH;
  const [isUsernameCreated, setIsUsernameCreated] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoggedInUser(user);
      if (loggedInUser && loggedInUser.displayName) {
        setIsUsernameCreated(true);
      } else {
        setIsUsernameCreated(false);
      }
    });
  }, [loggedInUser]);

  function AuthenticatedApp() {
    return loggedInUser === null || loggedInUser.emailVerified === false ? (
      <LoginStack />
    ) : !isUsernameCreated ? (
      <CreateUser setIsUsernameCreated={setIsUsernameCreated} />
    ) : (
      <MainTabNavigator
        setIsUsernameCreated={setIsUsernameCreated}
        hasLocationPermission={hasLocationPermission}
        setHasLocationPermission={setHasLocationPermission}
      />
    );
  }

  return (
    <LoggedInUser.Provider value={{ loggedInUser, setLoggedInUser }}>
      <UserProvider setIsUsernameCreated={setIsUsernameCreated}>
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
