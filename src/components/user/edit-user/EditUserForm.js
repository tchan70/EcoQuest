import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { db } from "../../../../firebaseConfig"
import { ref, onValue, set, remove } from "firebase/database"
import { FIREBASE_AUTH } from "../../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { UserContext } from "../../../../contexts/User";
import { LoggedInUser } from "../../../../contexts/LoggedInUser";

export default function EditUserForm({setEditUserModalVisible}) {

  const auth = FIREBASE_AUTH;
  const { setLoggedInUser } = useContext(LoggedInUser)
  const { user, setUser } = useContext(UserContext)
  const [newUsername, setNewUsername] = useState(null)
  const [usernameIsAvailable, setUserNameIsAvailable] = useState(false)

  function handleOnChange(newUsername) {
    setNewUsername(newUsername);
    const userRef = ref(db, `users/${newUsername}/`);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      !data ? setUserNameIsAvailable(true) : setUserNameIsAvailable(false)
    })
  }

  function handleUsernameChange() {
    if (usernameIsAvailable) {
      updateProfile(auth.currentUser, {
          displayName: newUsername
      })
      .then(() => {
        setUserNameIsAvailable(false);
        const userRef = ref(db, `users`);
        set(ref(db, `users/${newUsername}/points`), user.points)
      })
      .then(() => {
        remove(ref(db, `users/${user.username}`))
      })
      .then(() => {
        setLoggedInUser((currentUser) => {
          currentUser.displayName = newUsername;
          return currentUser;
        })
        setUser((currentUser) => {
          currentUser.username = newUsername;
          return currentUser;
        })
        setEditUserModalVisible(false)
      })
      .catch(err => alert(err))
    } 
  }

  return (
    <View style={styles.formContainer}>
      <Text>Change username</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {handleOnChange(text)}}
        value={newUsername}
        placeholder="New Username"
      />
    {newUsername ? (usernameIsAvailable ? <Text>Username available</Text> : <Text>Username not available</Text>) : null}
      <TouchableOpacity
        title="Save Changes"
        style={styles.submitButton}
        onPress={handleUsernameChange}
      >
        <Text style={styles.text}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
    backgroundColor: "#F5F5DC",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white"
  },
  submitButton: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a428',  
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: '50%',
    elevation: 3,
  },
  text: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 20,
  }
})
