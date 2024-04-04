import { Text, TextInput, View, StyleSheet, Button } from "react-native";
import { useState, useContext } from "react";
import { ref, onValue, set } from 'firebase/database';
import { db } from "../../../firebaseConfig";
import { FIREBASE_AUTH } from "../../../firebaseConfig";
import { updateProfile } from "firebase/auth";
import { LoggedInUser } from "../../../contexts/LoggedInUser"
import { UserContext } from "../../../contexts/User";

export default function CreateUser({setIsUsernameCreated}) {

    const { setLoggedInUser, loggedInUser } = useContext(LoggedInUser)
    const auth = FIREBASE_AUTH;
    const [username, setUsername] = useState(null)
    const [usernameIsAvailable, setUserNameIsAvailable] = useState(false)
    const { user, setUser } = useContext(UserContext)

    function handleOnChange(username) {
        setUsername(username);
            const userRef = ref(db, `users/${username}/`);
            onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    !data ? setUserNameIsAvailable(true) : setUserNameIsAvailable(false)
            })
    }

    function handleSubmit() {
        if (usernameIsAvailable) {
            updateProfile(auth.currentUser, {
                displayName: username
            })
            .then(() => {
                setUserNameIsAvailable(false);
                setIsUsernameCreated(true);
                console.log("displayName updated");
                set(ref(db, `users/${username}/points`), 0)
            })
            .then(() => {
                setLoggedInUser((currentUser) => {
                    currentUser.displayName = username;
                    return currentUser
                })
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }


    console.log(user.username)

    return (
        <View
        style={styles.view}>
            <Text style={styles.text}>CREATE USERNAME</Text>
            <TextInput
                style={styles.input}
                value={username}
                onChangeText={(text) => {handleOnChange(text)}}
                placeholder="Username"
                autoCapitalize="none"
            />
            {username ? (usernameIsAvailable ? <Text>Username available</Text> : <Text>Username not available</Text>) : null}
            <Button title="Submit" onPress={handleSubmit}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        width: 360,
        height: 300,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: "center",
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: "100%",
        padding: 10,
        margin: 10
    },
    buttons: {
        flexDirection: "row",
        gap: 15
    }
});