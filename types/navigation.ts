// types/navigation.ts
export type RootStackParamList = {
  StartScreen: undefined;
  MainScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}