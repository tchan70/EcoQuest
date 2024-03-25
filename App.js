import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage.js';
import User from './User.js';
import LeaderBoard from './LeaderBoard.js';
import Map from './Map.js';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from './Header.js';

const Tab = createBottomTabNavigator();

export default function App() {  
  return (
    <NavigationContainer>
      <Header style={{flex:1}}/>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false, tabBarOptions: {activeTintColor: 'green'}}}
        >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options= {{
            tabBarIcon: ({focused}) => {
              return (
                  <FontAwesome name="home" size={24} color={focused ? 'green' : 'black'} />
              )
            }
          }}>
        </Tab.Screen>
        <Tab.Screen
          name="User"
          component={User}
          options= {{
            tabBarIcon: ({focused}) => {
              return (
                  <FontAwesome name="user" size={24} color={focused ? 'green' : 'black'} />
              )
            }
          }}>
        </Tab.Screen>
        <Tab.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options= {{
            tabBarIcon: ({focused}) => {
              return (
                  <MaterialIcons name="leaderboard" size={24} color={focused ? 'green' : 'black'} />
              )
            }
          }}>
        </Tab.Screen>
        <Tab.Screen
          name="Map"
          component={Map} 
          options= {{
            tabBarIcon: ({focused}) => {
              return (
                  <FontAwesome name="map-marker" size={24} color={focused ? 'green' : 'black'} />
              )
            }
          }}>
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flex: 1
  }
});