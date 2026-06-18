import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Alunos from "../pages/Alunos";
import Disciplinas from "../pages/Disciplinas";
import Sobre from "../pages/Sobre";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Login"
          component={Login}
        />

        <Stack.Screen
          name="Home"
          component={Home}
        />

        <Stack.Screen
          name="Alunos"
          component={Alunos}
        />

        <Stack.Screen
          name="Disciplinas"
          component={Disciplinas}
        />

        <Stack.Screen
          name="Sobre"
          component={Sobre}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}