import { Text, View, StyleSheet} from "react-native"

export default function HomePage () {
    return (
        <View style={styles.home}>
        <Text style={styles.text}>Hello from HomePage!!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    home: {
        top: '5%',
        position: 'absolute',
        backgroundColor: 'blue'
    },
    text: {

    }
})