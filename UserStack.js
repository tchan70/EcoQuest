import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserPage from './UserPage';
import EditUserPage from './EditUserPage';

const Stack = createNativeStackNavigator();

export default function UserStack() {
    return <Stack.Navigator>
        <Stack.Screen name="UserPage" component={UserPage}/>
        <Stack.Screen name="EditUserPage" component={EditUserPage}/>
    </Stack.Navigator>
}