import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LogInOrSignInPage from "../LogInOrSignInPage";
import LoginPage from "./LoginPage";
import SignUpPage from "../signup/SignUpPage";
import CreateUser from "./CreateUser";

const Stack = createNativeStackNavigator();

export default function LoginStack() {
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}>
            <Stack.Screen name="LogInOrSignInPage" component={LogInOrSignInPage} />
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
            <Stack.Screen name="CreateUser" component={CreateUser} />
        </Stack.Navigator>
    );
}
