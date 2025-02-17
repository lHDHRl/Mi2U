import React from "react"
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Header, Input } from "../components/INHEADER"
import Message from "../components/MESSAGE"
import { useState } from "react"
import messageInterface from "../types/utils";

export default function MainScreen() {
  const [messages, setMessages] = useState<messageInterface[]>([]);
  const [input, setInput] = useState<string>("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Header />
          <ScrollView style={styles.messageContainer}>
            {messages.map((message) => (
              <Message key={message.messageId} {...message} />
            ))}
          </ScrollView>
          <Input
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#934CC2",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
});