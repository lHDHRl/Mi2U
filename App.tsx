import React, { useEffect, useMemo } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  useFonts,
  K2D_100Thin,
  K2D_800ExtraBold,
} from "@expo-google-fonts/k2d";
import * as SplashScreen from "expo-splash-screen";
import StartScreen from "./pages/start-screen";
import MainScreen from "./pages/main-screen";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    K2D_100Thin,
    K2D_800ExtraBold,
  });

  useEffect(() => {
    const hideSplashScreen = async () => {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    };
    hideSplashScreen();
  }, [fontsLoaded]);

  // Memoize navigator to prevent unnecessary re-renders
  const stackNavigator = useMemo(
    () => (
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    ),
    []
  );

  return (
    <NavigationContainer>
      {fontsLoaded ? stackNavigator : <></>}
    </NavigationContainer>
  );
}
