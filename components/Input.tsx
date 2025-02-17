import { useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";

export default function MyTextInput() {
  const [text, setText] = useState("");

  const handleOnChangeText = (text: string) => setText(text);

  return (
    <View id="text-input" style={myTextInputStyle.container}>
      <TextInput
        style={myTextInputStyle.textInput}
        multiline={true}
        placeholderTextColor={"#A4A4A4"}
        placeholder="Отправить сообщение:"
        value={text}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
}

const myTextInputStyle = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  textInput: {
    color: "black",
  },
});
