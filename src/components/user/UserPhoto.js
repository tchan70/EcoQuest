import { View, StyleSheet, Image } from "react-native";

export default function UserPhoto() {
    return <View style={styles.view}>
        <Image source={require('../../../assets/guest.jpg')} style={styles.image} resizeMode="cover" />
    </View>
}

const styles = StyleSheet.create({
    view: {
        borderWidth: 3,
        borderRadius: 150, 
        borderColor: '#a7e2a2',
        width: 200,
        height: 200,
        backgroundColor: '#F5F5DC',
        alignItems: 'center',
        justifyContent: "center",
        overflow: 'hidden', 
    },
    image: {
        width: '100%',
        height: '100%', 
        borderRadius: 150, 
    }
});