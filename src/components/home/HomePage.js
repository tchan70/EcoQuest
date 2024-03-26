import { StyleSheet, Text, View } from "react-native";
import LogLitter from "./LogLitter";
import DailyQuest from "./DailyQuest";

export default function HomePage() {
    return (
        <View style={styles.view}>
            <Text>Home Page!!</Text>
            <DailyQuest style={styles.daily_quest} />
            <LogLitter style={styles.log_litter} />
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
});
