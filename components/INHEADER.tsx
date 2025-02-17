import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import messageInterface from "../types/utils";

export function Input(props: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
}) {
  const { input, setInput, messages, setMessages } = props;

  const handleOnChangeText = useCallback((text: string) => setInput(text), []);

  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour12: false });
  };

  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newMessage: messageInterface = {
      type: "yours",
      messageId: Date.now().toString(),
      message: trimmedInput,
      time: formatTime(),
    };

    console.log("Message sent:", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    Keyboard.dismiss(); // Dismiss keyboard after sending
  }, [input, setMessages, setInput]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Напишите сообщение..."
        placeholderTextColor="#A4A4A4"
        value={input}
        onChangeText={handleOnChangeText}
      />
      <TouchableOpacity onPress={onSubmitEditing} style={styles.button}>
        <Text style={styles.buttonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    width: "100%",
  },
  textInput: {
    flex: 1,
    color: "black",
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#52B788",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export function Header() {
  return (
    <View style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </View>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#B8B2EF",
  },
});