import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Text } from "react-native";

export default function Header() {
  return (
    <View id="header" style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </View>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#934CC2",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "#B8B2EF",
  },
});
