import { StyleSheet, View } from 'react-native';
import NavBar from './NavBar.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage.js';

const Stack = createNativeStackNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Stack.Navigator  initialRoute={HomePage}>
        <Stack.Screen
        name="Home"
        component={HomePage}
        options= {{title: "EcoQuest"}}>
        </Stack.Screen>
      </Stack.Navigator>
      <View style={styles.container}>
      <NavBar/>
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFill,
      alignItems: 'center'
  }
});

//{StyleSheet.absoluteFill}