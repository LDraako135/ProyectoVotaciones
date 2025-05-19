# Crea el proyecto con TypeScript
npx create-expo-app proyecto-votaciones -t expo-template-blank-typescript
# Esto va a crear una carpeta llamada mi-proyecto-expo-ts con TypeScript preconfigurado.

# abrir el proyecto en la terminal VSCode
cd mi-proyecto-expo-ts

# Ejecutar el proyecto
npm start

# Configurar la navegación (React Navigation)
npx expo install @react-navigation/native
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-navigation/native-stack

# Bottom Tab Navigation CON EXPO Y TYPESCRIPT (menú inferior con pestañas o componente Header)
npx expo install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

#  instalar íconos
npx expo install @expo/vector-icons
@react-native-picker/picker


1. instalar AsyncStorage
npx expo install @react-native-async-storage/async-storage

# para otros elementos (lista select)
npm install @react-native-picker/picker
