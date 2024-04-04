import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { LoggedInUser } from "../../../contexts/LoggedInUser";

const { width } = Dimensions.get("window");

export default function LoginPage({ navigation: { replace } }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const { setLoggedInUser } = useContext(LoggedInUser);

  function handleLogin() {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoggedInUser(auth.currentUser);
      })
      .catch((err) => alert("Could not login! " + err.message));
  }

  function handleGoBack() {
    replace("LogInVsSignUpPage");
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>
        Welcome back to 
        <Text style={styles.eco}> Eco</Text>
        <Text style={styles.quest}>Quest</Text>
        !
      </Text>
      <Image
        source={require("../../../assets/EcoQuestLogo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        autoCapitalize="none"
        secureTextEntry
      />
      <View style={styles.buttons}>
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoBack}
          style={[styles.button, styles.backButton]}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5DC",
  },
  headerText: {
    color: "#41773e",
    textAlign: 'center',
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#c8e49e",
    borderWidth: 2,
    borderRadius: 30,
    width: width * 0.8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fafaee",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
  },
  loginButton: {
    borderWidth: 2,
    borderColor: "#b0ca8c", 
    backgroundColor: "#a8c47f",
    borderRadius: 30,
    padding: 10,
    elevation: 4,
  },
  backButton: {
    borderWidth: 2,
    borderColor: "#989898",
    borderRadius: 30,
    backgroundColor: "#8c8c8c",
    padding: 10,
    elevation: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: {
    width: width * 0.8, 
    height: width * 0.4, 
    resizeMode: "contain",
    marginBottom: 20,
  },
  eco: {
    color: "#58a254",
  },
  quest: {
    color: "#4ea4ff",
  },
});
