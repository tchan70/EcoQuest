import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function LogLitter({location}) {
  
    return (
        <TouchableOpacity onPress={()=>{console.log("logged litter at", location)}} style={styles.button}>
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
    text: {
        color: "white",
        fontWeight: 'bold'
    },
});
