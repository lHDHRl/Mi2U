import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  K2D_100Thin,
  K2D_800ExtraBold,
} from "@expo-google-fonts/k2d";
import * as SplashScreen from "expo-splash-screen";
import StartScreen from "./pages/StartScreen";
import MainScreen from "./pages/MainScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    K2D_100Thin,
    K2D_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Экран загрузки
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false, // Скрыть заголовок на всех экранах
          animation: "fade", // Анимация перехода
        }}
      >
        <Stack.Screen
          name="StartScreen"
          component={StartScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ title: "Main Screen" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
