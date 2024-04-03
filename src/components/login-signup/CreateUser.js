import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import { ref, onValue, set } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";

const { width } = Dimensions.get("window"); // Get the device width for responsive design

export default function CreateUser({ setIsUsernameCreated }) {
  const auth = FIREBASE_AUTH;
  const [username, setUsername] = useState(null);
  const [usernameIsAvailable, setUsernameIsAvailable] = useState(false);

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
          console.log("displayName updated");
          set(ref(db, `users/${username}/points`), 0);
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
        onChangeText={handleOnChange}
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
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
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
    borderColor: "#228B22",
    borderWidth: 2,
    borderRadius: 30,
    width: width * 0.8,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "white",
  },
  headerText: {
    color: "#228B22",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 20,
  },
  availabilityText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#228B22",
    paddingVertical: 10,
    paddingHorizontal: 20,
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
});
