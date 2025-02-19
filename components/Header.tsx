import { Text, StyleSheet, SafeAreaView } from "react-native";

export function Header() {
  return (
    <SafeAreaView style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </SafeAreaView>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#934CC2",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#B8B2EF",
    textAlign: "center",
  },
});