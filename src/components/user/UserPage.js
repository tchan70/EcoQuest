import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity} from "react-native";
import UserDetails from "./UserDetails";
import EditUserForm from "./edit-user/EditUserForm.js";
import { UserContext } from "../../../contexts/User";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { db } from "../../../firebaseConfig";
import { ref, remove } from "firebase/database";
import { getAuth, deleteUser } from "firebase/auth";
import { LoggedInUser } from "../../../contexts/LoggedInUser.js";


export default function UserPage( {setIsUsernameCreated} ) {


  const auth = getAuth();
  const userAuth = auth.currentUser;

  const { user, setUser } = useContext(UserContext);
  const { loggedInUser, setLoggedInUser } = useContext(LoggedInUser)
  const [editUserModalVisible, setEditUserModalVisible] = useState(false);
  
  function handleLogOut() {
     FIREBASE_AUTH.signOut()
  }


  function handleDeleteUser() {
    deleteUser(userAuth)
    .catch(err => alert(err))
    .then(() => {
      remove(ref(db, `users/${user.username}`))
      setIsUsernameCreated(false)
    })
    .catch(err => {
      setIsUsernameCreated(true)
      alert("error occured: "+ err.msg)
    })
  }
  
 
  return (
    <View style={styles.view}>
      <UserDetails />
      <View style={styles.buttons}> 
      <TouchableOpacity
        onPress={() => setEditUserModalVisible(true)}
        style={styles.editUserButton}
      >
        <Text style={styles.text}>Edit User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDeleteUser}
        style={styles.deleteButton}
      >
        <Text style={styles.text}>Delete User</Text>
      </TouchableOpacity>
      </View>
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
            <EditUserForm setEditUserModalVisible={setEditUserModalVisible}/>
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
      width: '40%',
      paddingVertical: 12,
      backgroundColor: '#8fa76c', 
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
      padding: 10
    },
    modalView: {
      width: '80%',
      backgroundColor: '#F5F5DC',
      borderRadius: 20,
      alignItems: 'center',
      elevation: 5,
    },
    cancelButton: {
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#96a08d', 
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
      width: '50%',
      elevation: 3,
    },
    deleteButton : {
        borderRadius: 20,
        width: '40%',
        paddingVertical: 12,
        backgroundColor: '#FF6B6B', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 3,
    },
    logOutButton: {
      borderRadius: 20,
      width: '40%',
      paddingVertical: 12,
      backgroundColor: '#96a08d', 
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      elevation: 3,
    },
    buttons: {
      flexDirection: "row",
      gap: 20
    }
  });        
