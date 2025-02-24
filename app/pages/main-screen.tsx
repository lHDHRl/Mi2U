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
  GestureResponderEvent,
} from "react-native";
import { Input } from "../components/Input";
import Message from "../components/Message";
import messageInterface from "../types/utils";
import { Header } from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from "react-native";
import axios from "axios";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

export default function MainScreen() {
  const [messages, setMessages] = useState<messageInterface[]>([]); // массив сообщений
  const [input, setInput] = useState<string>(""); // поле ввода
  const scrollViewRef = useRef<ScrollView>(null); // для кнопки скролла вниз
  const [showScrollButton, setShowScrollButton] = useState(false); // отображение кнопки скролла вниз
  const isAutoScrolling = useRef(false);
  const isUserAtBottom = useRef(true);
  const [replyMessage, setReplyMessage] = useState<messageInterface | null>(
    null
  );
  const [menuVisible, setMenuVisible] = useState(false); // Видимость меню
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(
    null
  ); // ID выбранного сообщения

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 }); // координаты касания пользователя
  const [isMessagePopupTouched, setIsMessagePopupTouched] = useState(false);

  // Еще хочется добавить что в коде уже происходит пиздец и его бы разделить
  //Взаимодействие с беком (непотерять, работает локально ток у меня)
  const sendMessageToServer = async (message: messageInterface) => {
    try {
      await axios.post("http://192.168.1.48/send", message); // если кто вдруг тестить будет поменяйте тут на свой ipconfig ipv4 wlan device
      console.log("Message sent to server:", message);
    } catch (error) {
      console.error("Failed to send message to server:", error);
    }
  };

  useEffect(() => {
    // как только изменяется массив с сообщениями скроллится вниз
    if (messages.length === 0 || !isUserAtBottom.current) return;
    scrollToBottom();
  }, [messages]);

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const THRESHOLD = 150; // Высота нескольких сообщений, т.е. кнопка появляется после того как пользователь
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 10;
    const isNearBottom =
      contentOffset.y + layoutMeasurement.height >=
      contentSize.height - THRESHOLD;

    if (isAtBottom !== isUserAtBottom.current) {
      isUserAtBottom.current = isAtBottom;
    }

    if (!isNearBottom) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  }, []);

  const handleLongPress = (event: GestureResponderEvent, messageId: string) => {
    // setSelectedMessageId(messageId); // Сохраняем ID выбранного сообщения
    // showDeleteMenu(); // Показываем меню
    console.log("main-screen handleLongPress");
    const { pageX, pageY, locationX, locationY } = event.nativeEvent;
    // setCoordinates({ x: pageX, y: pageY });
    console.log(locationX, locationY);
    setCoordinates({ x: locationX, y: locationY });
    setSelectedMessageId(messageId);
  };
  const closeMessagePopup = () => setSelectedMessageId(null);

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

  const showDeleteMenu = () => {
    if (!selectedMessageId) return;

    Alert.alert(
      "Удалить сообщение",
      "Вы уверены, что хотите удалить это сообщение?",
      [
        {
          text: "Отмена",
          onPress: () => setMenuVisible(false),
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            deleteMessage(selectedMessageId);
            setMenuVisible(false);
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View
      // onTouchStart={() => closeMessagePopup()}
      style={styles.safeContainer}
    >
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
            <Message
              {...message}
              key={message.messageId}
              setReplyMessage={setReplyMessage}
              handleLongPress={(event) => {
                console.log(
                  messages.find((m) => m.messageId === message.messageId)
                    ?.message
                );
                handleLongPress(event, message.messageId);
              }} // Передаем обработчик долгого нажатия
            />
          ))}
          <Message
            type="theirs"
            messageId="228"
            message="Привет! Как дела? Я хочу рассказать историю как я попал в зомба апокалипсис прикинь да"
            time="12:00"
            setReplyMessage={setReplyMessage}
          />
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
            replyMessage={replyMessage}
            setReplyMessage={setReplyMessage}
            sendMessageToServer={sendMessageToServer}
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
    borderColor: "blue",
    borderWidth: 1,
  },
  container: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    padding: 10,
    borderColor: "red",
    borderWidth: 0.5,
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
