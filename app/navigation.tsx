import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Login';
import AcercaDeScreen from '../screens/Admin'
import AdministativoScreen from '../screens/Administrativo'
import CandidatoScreen from '../screens/Candidato'
import VotanteScreen from '../screens/Votante'
import Login from '../screens/Login';
import AdminScreen from '../screens/Admin';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            // 🔧 Inicializamos con valor por defecto
            let iconName: keyof typeof Ionicons.glyphMap = 'help';
            // 🔧 Cambiamos el icono dependiendo de la rut
            if (route.name === 'Login') {
              iconName = 'log-in';
            }
            else if (route.name === 'Administrador') {
              iconName = 'person-circle';
            }
            else if (route.name === 'Administracion') {
              iconName = 'person-add';
            }
            else if (route.name === 'Candidato') {
              iconName = 'person';
            }
            else if (route.name === 'Votante') {
              iconName = 'people';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Login" component={Login} />
        <Tab.Screen name="Administrador" component={AdminScreen} />
        <Tab.Screen name="Administracion" component={AdministativoScreen} />
        <Tab.Screen name="Candidato" component={CandidatoScreen} />
        <Tab.Screen name="Votante" component={VotanteScreen} />


      </Tab.Navigator>
    </NavigationContainer>
  );
}