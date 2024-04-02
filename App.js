import { StyleSheet,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import CreateUser from "./src/components/login-signup/login/CreateUser.js";
import { FIREBASE_AUTH } from "./firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";
import { useContext, useState, useEffect } from "react";
import { UserProvider, UserContext  } from "./contexts/User.js";
import { QuestsProvider} from "./contexts/Quests.js";
import MainTabNavigator from "./src/components/tab-navigator/MainTabNavigator.js";

export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const auth = FIREBASE_AUTH;
  const [user, setUser] = useState(auth.currentUser)
  const [isUsernameCreated, setIsUsernameCreated] = useState(false);
//    const [user, setUser] = useState({emailVerified: true, username: "Mantequilla", points: 43 })

  useEffect(() => {
        onAuthStateChanged(auth,  (user) => {
            setUser(user)
            if (user && user.displayName) {
                setIsUsernameCreated(true);
            }
        })
    }, [])


  function AuthenticatedApp() {
    const { user } = useContext(UserContext);
    return user === null || user.emailVerified === false ? (
      <LoginStack />
    ) : !user.displayName ? (
                    <CreateUser setIsUsernameCreated={setIsUsernameCreated}/> 
    ) : (
      <MainTabNavigator 
        hasLocationPermission={hasLocationPermission} 
        setHasLocationPermission={setHasLocationPermission} 
      />
    )
  }


  return (
    <UserProvider>
    <QuestsProvider>
      <NavigationContainer>
        <Header style={{ flex: 1 }} />
        <AuthenticatedApp />
      </NavigationContainer>
    </QuestsProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
});
