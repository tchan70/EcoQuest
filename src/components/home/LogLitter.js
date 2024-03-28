import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { db } from "../../../firebaseConfig";
import { ref, set } from 'firebase/database';
import { UserContext } from "../../../contexts/User";
import { useContext, useState } from "react";
import * as Location from 'expo-location';

export default function LogLitter({hasLocationPermission }) {

    const { user, setUser } = useContext(UserContext)
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const postLitterLocation = () => {
        setButtonDisabled(true)
        if (hasLocationPermission) {
            (async () => {
                let currentLocation = await Location.getCurrentPositionAsync({});
                set(ref(db, `locations/${Date.now()}/`), {latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude })
                set(ref(db, `users/${user.username}/points`), user.points++)
                    .then(() => {
                        const updatedUser = { ...user }
                        updatedUser.points = user.points++
                        setUser(updatedUser)
                        setButtonDisabled(false)
                    })
                    .catch((error) => console.log(error))
            })()
        }

    }

    return (
        <TouchableOpacity onPress={postLitterLocation} style={buttonDisabled ? styles.disabledButton : styles.button} disabled={buttonDisabled}>
            <Text style={styles.text}>LOG LITTER</Text>
        </TouchableOpacity>);
}

const styles = StyleSheet.create({
    button: {
        borderWidth: 5,
        borderRadius: 38,
        width: 170,
        height: 80,
        backgroundColor: "green",
        alignItems: 'center',
        justifyContent: "center"
    },
    disabledButton: {
        borderWidth: 5,
        borderRadius: 38,
        width: 170,
        height: 80,
        backgroundColor: "grey",
        alignItems: 'center',
        justifyContent: "center"
    },
    text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 18
    },
});
