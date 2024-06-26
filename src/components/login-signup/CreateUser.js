import React, { useState, useContext } from "react";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { LoggedInUser } from "../../../contexts/LoggedInUser";
import { UserContext } from "../../../contexts/User";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
const { width } = Dimensions.get("window");

export default function CreateUser({ setIsUsernameCreated }) {
  const { setLoggedInUser } = useContext(LoggedInUser);
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState(null);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState(false);
  const { setUser } = useContext(UserContext);

  function handleOnChange(username) {
    setUsername(username);
    const userRef = ref(db, `users/${username}/`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      !data ? setUsernameIsAvailable(true) : setUsernameIsAvailable(false);
    });
  }

  function handleSubmit() {
    if (usernameIsAvailable) {
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          setUsernameIsAvailable(false);
          setIsUsernameCreated(true);
          set(ref(db, `users/${username}`), {logs: "", points: 0})
        })
        .then(() => {
          setLoggedInUser((currentUser) => {
            currentUser.displayName = username;
            return currentUser;
          });
        })
        .then(() => {
          setUser((currentUser) => {
            currentUser.username = username;
            currentUser.points = 0;
            return currentUser;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <View style={styles.view}>
      <Text style={styles.headerText}>Please Create A Username!</Text>
      <Image
        source={require("../../../assets/EcoQuestLogo.png")}
        style={styles.logo}
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={(text) => {
          handleOnChange(text);
        }}
        placeholder="Username"
        autoCapitalize="none"
      />
      {username ? (
        usernameIsAvailable ? (
          <Text style={styles.availabilityText}>Username available</Text>
        ) : (
          <Text style={styles.availabilityText}>Username not available</Text>
        )
      ) : null}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  headerText: {
    color: "#41773e",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 16,
    marginBottom: 10,
  },
  submitButton: {
    borderWidth: 2,
    borderColor: "#b0ca8c",
    backgroundColor: "#a8c47f",
    borderRadius: 30,
    padding: 10,
    elevation: 4,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: width * 0.8,
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
});
