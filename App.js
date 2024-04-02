import { StyleSheet,} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./src/components/Header.js";
import LoginStack from "./src/components/login-signup/login/LoginStack.js";
import { useContext, useState } from "react";
import { UserProvider, UserContext } from "./contexts/User.js";
import { QuestsProvider} from "./contexts/Quests.js";
import MainTabNavigator from "./src/components/tab-navigator/MainTabNavigator.js";

export default function App() {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  function AuthenticatedApp() {
    const { user } = useContext(UserContext);
    return user === null || user.emailVerified === false ? (
      <LoginStack />
    ) : (
      <MainTabNavigator 
        hasLocationPermission={hasLocationPermission} 
        setHasLocationPermission={setHasLocationPermission} 
      />
    );
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
