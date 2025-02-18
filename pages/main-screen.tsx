import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Input } from "../components/Input";
import Message from "../components/Message";
import { useState } from "react";
import messageInterface from "../types/utils";
import { useEffect, useRef } from "react"; // чтобы был скролл
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PrefersHomeIndicatorAutoHidden, { HomeIndicator } from "react-native-home-indicator";
import { SafeAreaView } from "react-native-safe-area-context"; // хуйня чтобы шапка не вылезала за пределы экрана
import { Text, TouchableOpacity } from "react-native";
import { Header } from "../components/Header";
// главный экран чата
export default function MainScreen() {
  // массив сообщенийs
  const [messages, setMessages] = useState<messageInterface[]>([]);
  // хранит текст введенный в поле ввода
  const [input, setInput] = useState<string>("");
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const viewRef = useRef<View>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
<<<<<<< HEAD
    scrollViewRef.current?.scrollToEnd({ animated: true, })
  }, [messages])
  
=======
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Запрашиваем актуальные размеры контейнера
        viewRef.current?.measure((x, y, width, height) => {
          setContainerHeight(height);
          scrollViewRef.current?.scrollToEnd({ animated: true });
        });
      }
    );
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);

  const [showScrollButton, setShowScrollButton] = useState(false);
  const isAutoScrolling = useRef(false); // Флаг для отслеживания автоскролла

  const handleScroll = (event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const contentTotalHeight = event.nativeEvent.contentSize.height;

    // Более точное определение достижения низа
    const isAtBottom = offsetY + visibleHeight >= contentTotalHeight - 1;

    // Игнорируем события во время автоскролла
    if (!isAutoScrolling.current) {
      setShowScrollButton(!isAtBottom);
    }
  };

  const handleMomentumScrollEnd = () => {
    // После завершения инерционной прокрутки
    isAutoScrolling.current = false;
  };

  const scrollToBottom = () => {
    isAutoScrolling.current = true;
    setShowScrollButton(false); // Сразу скрываем кнопку
    scrollViewRef.current?.scrollToEnd({ animated: true });

    setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500); // Увеличиваем задержку для анимации
  };

  // Обновленный useEffect для сообщений
  useEffect(() => {
    if (messages.length === 0) return;

    isAutoScrolling.current = true;
    scrollViewRef.current?.scrollToEnd({ animated: true });

    // Убираем принудительное скрытие кнопки здесь
    const timer = setTimeout(() => {
      isAutoScrolling.current = false;
    }, 500);

    return () => clearTimeout(timer);
  }, [messages]);
>>>>>>> main

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
<<<<<<< HEAD
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
=======
        <View
          style={styles.innerContainer}
          ref={viewRef}
          onLayout={() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
          }}
        >
          <Header />
          <ScrollView
            style={[styles.messageContainer, { height: containerHeight }]}
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            onContentSizeChange={() => {
              // Добавляем проверку позиции при изменении контента
              scrollViewRef.current?.scrollToEnd({ animated: true });
            }}
            onScroll={handleScroll}
            onMomentumScrollEnd={handleMomentumScrollEnd}
            scrollEventThrottle={16} // Более частая частота обновления
          >
            {messages.map((message) => (
              <Message key={message.messageId} {...message} />
            ))}
          </ScrollView>

          {showScrollButton && (
            <TouchableOpacity
              style={styles.scrollButton}
              onPress={scrollToBottom}
            >
              <Text style={styles.scrollButtonText}>▼</Text>
            </TouchableOpacity>
          )}

          <Input
            input={input}
            setInput={setInput}
            messages={messages}
            setMessages={setMessages}
          />
        </View>
>>>>>>> main
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
  scrollButton: {
    position: "absolute",
    left: 20,
    bottom: 100,
    backgroundColor: "rgba(0,0,0,0.7)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollButtonText: {
    color: "black",
    fontSize: 20,
    marginTop: -3,
  },
});
