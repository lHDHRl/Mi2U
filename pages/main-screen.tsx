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
import Message from "../components/Message"
import { useState } from "react"
import messageInterface from "../types/utils";

import { useEffect, useRef } from "react";

// главный экран чата 
export default function MainScreen() {
  // массив сообщений 
  const [messages, setMessages] = useState<messageInterface[]>([]);
  // хранит текст введенный в поле ввода 
  const [input, setInput] = useState<string>("");

  const scrollViewRef = useRef<ScrollView>(null);
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true, });
  }, [messages])

  return (
    <KeyboardAvoidingView
      // из-строки ниже на андроидах появляется белый выступ снизу 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Header />
          <ScrollView style={styles.messageContainer} ref={scrollViewRef}>
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
    // backgroundColor: "white",
    flex: 1,
    padding: 10,
  },
});