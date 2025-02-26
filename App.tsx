import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  useFonts,
  K2D_100Thin,
  K2D_800ExtraBold,
} from "@expo-google-fonts/k2d";
import React, { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useMemo } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartScreen from "./app/pages/start-screen";
import MainScreen from "./app/pages/main-screen";

const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        {fontsLoaded ? stackNavigator : <></>}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
