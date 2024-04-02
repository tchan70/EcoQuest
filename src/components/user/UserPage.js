import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity} from "react-native";
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
      <UserDetails user={user} />
      <TouchableOpacity
        onPress={() => setEditUserModalVisible(true)}
        style={styles.editUserButton}
      >
        <Text style={styles.text}>Edit User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleLogOut}
        style={styles.logOutButton}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
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
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#F5F5DC', 
    },
    editUserButton: {
      borderRadius: 20,
      width: '70%',
      paddingVertical: 12,
      backgroundColor: '#87CEEB', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      elevation: 3,
    },
    text: {
      color: '#FFFFFF', 
      fontWeight: 'bold',
      fontSize: 20,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      width: '80%',
      backgroundColor: '#F5F5DC',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    cancelButton: {
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#949494', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      width: '50%',
      elevation: 3,
    },
    logOutButton: {
        borderRadius: 20,
        width: '70%',
        paddingVertical: 12,
        backgroundColor: '#FF6B6B', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        elevation: 3,
    }
  });