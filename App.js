import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './HomePage.js';
import LeaderBoardPage from './LeaderBoardPage.js';
import Map from './Map.js';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import Header from './Header.js';
import LoginStack from './LoginStack.js'
import { useState } from 'react';
import { UserProvider } from './contexts/User.js';
import UserStack from './UserStack.js';

const Tab = createBottomTabNavigator();


export default function App() {
  const [hasNotLoggedIn, setHasNotLoggedIn] = useState(false)
  return (
    <UserProvider>
    <NavigationContainer>
      <Header style={{flex:1}}/>
      {hasNotLoggedIn ? <LoginStack setHasNotLoggedIn={setHasNotLoggedIn}/> : (<>
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
          component={UserStack}
          options= {{
            tabBarIcon: ({focused}) => {
              return (
                  <FontAwesome name="user" size={24} color={focused ? 'green' : 'black'} />
              )
            }
          }}
          >
        </Tab.Screen>
        <Tab.Screen
          name="LeaderBoard"
          component={LeaderBoardPage}
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
      </>)
    }
    </NavigationContainer>
  </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
      flex: 1
  }
});