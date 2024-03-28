import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, Button } from "react-native";
import UserDetails from "./UserDetails";
import EditUserForm from "./edit-user/EditUserForm.js";
import { UserContext } from "../../../contexts/User";
import { FIREBASE_AUTH } from "../../../firebaseConfig";

export default function UserPage() {
  const { user } = useContext(UserContext);
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  
  function handleLogOut() {
     FIREBASE_AUTH.signOut()
  }

  return (
    <View style={styles.view}>
      <Text>User Page!!</Text>
      <UserDetails user={user} />
      <TouchableOpacity
        onPress={() => setEditUserModalVisible(true)}
        style={styles.editUserButton}
      >
        <Text style={styles.text}>Edit User</Text>
      </TouchableOpacity>
      <Button title="LogOut" onPress={handleLogOut}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={editUserModalVisible}
        onRequestClose={() => {
          setEditUserModalVisible(!editUserModalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <EditUserForm onFormSubmit={() => setEditUserModalVisible(false)} />
            <TouchableOpacity
              onPress={() => setEditUserModalVisible(false)}
              style={styles.cancelButton}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f5",
  },
  editUserButton: {
    borderWidth: 2,
    borderRadius: 30,
    width: 200,
    height: 50,
    backgroundColor: "#4e4e50",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    backgroundColor: "#a0a0a0", // A neutral color for cancel
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "80%",
    alignSelf: "center",
  },
});
