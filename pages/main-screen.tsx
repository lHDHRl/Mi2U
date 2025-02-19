import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import { Input } from "../components/Input";
import Message from "../components/Message";
import messageInterface from "../types/utils";
import { Header } from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MainScreen() {
  const [messages, setMessages] = useState<messageInterface[]>([]);
  const [input, setInput] = useState<string>("");
  const scrollViewRef = useRef<ScrollView>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const isAutoScrolling = useRef(false);
  const isUserAtBottom = useRef(true);

  useEffect(() => {
    if (messages.length === 0 || !isUserAtBottom.current) return;
    scrollToBottom();
  }, [messages]);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isAtBottom = contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;

    if (isAtBottom !== isUserAtBottom.current) {
      isUserAtBottom.current = isAtBottom;
      setShowScrollButton(!isAtBottom);
    }
  }, []);

  const scrollToBottom = useCallback(() => {
    isAutoScrolling.current = true;
    setShowScrollButton(false);
    scrollViewRef.current?.scrollToEnd({ animated: true });

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500);
  }, []);

  return (
    <View style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Header />
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageContainer}
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={() => {
            if (isUserAtBottom.current) scrollToBottom();
          }}
        >
          {messages.map((message) => (
            <Message key={message.messageId} {...message} />
          ))}
        </ScrollView>

        {/* Контейнер для кнопки, чтобы она не скрывалась за клавиатурой */}
        <View>
          {showScrollButton && (
            <TouchableOpacity style={styles.scrollButton} onPress={scrollToBottom}>
              <Text style={styles.scrollButtonText}>⬇</Text>
            </TouchableOpacity>
          )}
          <Input input={input} setInput={setInput} messages={messages} setMessages={setMessages} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#934CC2",
  },
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  scrollButton: {
    position: "absolute",
    right: 20,
    bottom: 80, // Подняли кнопку выше
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10, // Убедимся, что кнопка поверх всего
    paddingBottom: Platform.OS === "ios" ? 10 : 0,
  },
  scrollButtonText: {
    color: "white",
    fontSize: 22,
  },
});