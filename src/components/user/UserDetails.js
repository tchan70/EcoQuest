import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { ref, onValue } from 'firebase/database';
import { db } from '../../../firebaseConfig.js';
import UserPhoto from "./UserPhoto";
import { useContext } from "react";
import { UserContext } from "../../../contexts/User";


export default function UserDetails() {
  
  
    const { user } = useContext(UserContext);
  // this is the loggedIn user big object from authentication. you can, for example, access user email by using user.email at the moment
  
    const [points, setPoints] = useState('0');

    
    useEffect(() => {
        const userDetailsRef = ref(db, `users/${user}/points`);
        onValue(userDetailsRef, (snapshot) => {
                const data = snapshot.val();
                setPoints(data);
        })
    }, [])
    
    
    return (
        <View style={styles.view}>
            <Text style={styles.text}>{user.email}</Text>
            <UserPhoto />
            <Text style={styles.points}>{ points }</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 5,
        borderRadius: 10,
        width: 380,
        height: 470,
        backgroundColor: "purple",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5%",
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
    },
    points: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: "10%",
    },
});
