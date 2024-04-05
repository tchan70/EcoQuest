import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { db } from "../../../../firebaseConfig";
import { ref, onValue, set, remove } from "firebase/database";
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../../../../contexts/User";
import { LoggedInUser } from "../../../../contexts/LoggedInUser";

export default function EditUserForm({ setEditUserModalVisible }) {
  const auth = FIREBASE_AUTH;
  const { setLoggedInUser } = useContext(LoggedInUser);
  const { user, setUser } = useContext(UserContext);
  const [newUsername, setNewUsername] = useState(null);
  const [usernameIsAvailable, setUserNameIsAvailable] = useState(false);

  function handleOnChange(newUsername) {
    setNewUsername(newUsername);
    const userRef = ref(db, `users/${newUsername}/`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      !data ? setUserNameIsAvailable(true) : setUserNameIsAvailable(false);
    });
  }

  function handleUsernameChange() {
    if (usernameIsAvailable) {
      updateProfile(auth.currentUser, {
        displayName: newUsername,
      })
        .then(() => {
          setUserNameIsAvailable(false);
          set(ref(db, `users/${newUsername}`),{ points: user.points, logs: ""});
        })
        .then(() => {
          remove(ref(db, `users/${user.username}`));
        })
        .then(() => {
          setLoggedInUser((currentUser) => {
            currentUser.displayName = newUsername;
            return currentUser;
          });
          setUser((currentUser) => {
            currentUser.username = newUsername;
            return currentUser;
          });
          setEditUserModalVisible(false);
        })
        .catch((err) => alert(err));
    }
  }

  return (
    <View style={styles.formContainer}>
      <Text style={styles.changeUsername}>Change username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          handleOnChange(text);
        }}
        value={newUsername}
        placeholder="New Username"
      />
      {newUsername ? (
        usernameIsAvailable ? (
          <Text>Username available</Text>
        ) : (
          <Text>Username not available</Text>
        )
      ) : null}
      <TouchableOpacity
        title="Save Changes"
        style={styles.submitButton}
        onPress={handleUsernameChange}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    backgroundColor: "#F5F5DC",
  },
  input: {
    height: 50,
    borderColor: "#ddddcc",
    borderWidth: 2,
    borderRadius: 30,
    width: 200,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#fafaee",
  },
  submitButton: {
    borderRadius: 20,
    width: "40%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: "#8fa76c",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: -20,
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
  },
  changeUsername: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#808080",
  },
});
