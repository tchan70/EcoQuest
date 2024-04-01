import React, { useState, useContext } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { db } from "../../../../firebaseConfig"
import { ref, update } from "firebase/database"
import { UserContext } from "../../../../contexts/User"

export default function EditUserForm({ onFormSubmit }) {
  const { user } = useContext(UserContext)
  const [name, setName] = useState("")

  const handleUpdate = () => {
    const userRef = ref(db, `users/${user}`);
    const updatedData = {};
    if (name) updatedData["/name"] = name;

    update(userRef, updatedData)
      .then(() => {
        console.log("User updated successfully!");
        if (onFormSubmit) onFormSubmit();
      })
      .catch((err) => {
        console.error("Error updating user:", err);
      });
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="New Username"
      />
      <TouchableOpacity
        title="Save Changes"
        style={styles.submitButton}
        onPress={() => {
          handleUpdate()
          onFormSubmit()
        }}
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
    padding: 10,
    backgroundColor: "#F5F5DC",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submitButton: {
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#28a428', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      elevation: 3,
      width: "50%",
  },
  text: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 20,
  },
})
