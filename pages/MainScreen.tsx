import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import Input from "../components/Input";
import Message from "../components/Message";
import { useState } from "react";
import messageInterface from "../types/utils";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

export default function MainScreen() {
  const [messages, setMessages] = useState<messageInterface[] | []>([]);
  const [input, setInput] = useState<string>("");

  return (
    <View style={styles.container}>
      <Header />
      <View>
        {messages.map((message) => {
          return <Message key={message.messageId} {...message} />;
        })}
      </View>
      <Input
        input={input}
        setInput={setInput}
        messages={messages}
        setMessages={setMessages}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#934CC2",
  },
  text: {
    fontSize: 24,
    color: "#B8B2EF",
  },
});
