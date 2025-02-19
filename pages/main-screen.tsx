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
    // как только изменяется массив с сообщениями скроллится вниз
    if (messages.length === 0 || !isUserAtBottom.current) return;
    scrollToBottom();
  }, [messages]);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const THRESHOLD = 250; // Высота нескольких сообщений, т.е. кнопка появляется после того как пользователь находится на какой то высоте от конца
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;
    const isNearBottom =
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - THRESHOLD;

    if (isAtBottom !== isUserAtBottom.current) {
      isUserAtBottom.current = isAtBottom; // уверен что где то понадообится потом
    }

    if (!isNearBottom) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
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

  // для удаления сообщений по id
  const deleteMessage = (id: string) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.messageId !== id)
    );
  };

  return (
    <View style={styles.safeContainer}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        {/* по совету дани чтобы хедер не залазил на шапку телефона */}
        <SafeAreaView>
          <Header />
        </SafeAreaView>
        <ScrollView
          ref={scrollViewRef}
          style={styles.messageContainer}
          keyboardShouldPersistTaps="handled"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={() => {
            // if (isUserAtBottom.current) scrollToBottom(); // вот так было - из-за этого скролл происходил только когда юзер уже был внизу
            scrollToBottom(); // убрал условие чтобы скроллилось вниз всегда при отправке сообщений независимо от того где был пользователь
          }}
        >
          {messages.map((message) => (
            <Message key={message.messageId} {...message} />
          ))}
          <Message type="theirs" messageId="1" message="Привет!" time="12:00" />
        </ScrollView>

        {/* Контейнер для кнопки, чтобы она не скрывалась за клавиатурой */}
        <View>
          {showScrollButton && (
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={scrollToBottom}
            >
              <Text style={styles.scrollButtonText}>⬇</Text>
            </TouchableOpacity>
          )}
          <Input
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
          />
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
    bottom: Platform.OS === "ios" ? 105 : 90, // Подняли кнопку выше
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    zIndex: 10, // Убедимся, что кнопка поверх всего
    // paddingBottom: Platform.OS === "ios" ? 10 : 0, // от этого кнопка вниз вытягивалась вниз
  },
  scrollButtonText: {
    color: "white",
    fontSize: 22,
  },
});
