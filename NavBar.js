import { Button, View , StyleSheet} from "react-native"

export default function NavBar() {
    return (
      <View style={styles.navbar}>
        <Button style={styles.button} title="HomePage"></Button>
        <Button style={styles.button} title="User"></Button>
        <Button title="LeaderBoard"></Button>
        <Button title="Map"></Button>
      </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        bottom: '5%',
        position: 'absolute',
        fontSize: 20,
        flexDirection: 'row',
        gap: 15
    },
    button: {
        padding: 10
    }
})