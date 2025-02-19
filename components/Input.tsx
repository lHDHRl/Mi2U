import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import messageInterface from "../types/utils";
import { v4 as uuidv4 } from "uuid";
import "react-native-get-random-values";

// Определяем типы пропсов
interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
  replyMessage: messageInterface | null; // Добавляем replyMessage
  setReplyMessage: React.Dispatch<
    React.SetStateAction<messageInterface | null>
  >; // Добавляем setReplyMessage
}

// Компонент ввода сообщения
export const Input: React.FC<Props> = ({
  input,
  setInput,
  messages,
  setMessages,
  replyMessage, // Добавляем replyMessage
  setReplyMessage, // Добавляем setReplyMessage
}) => {
  const handleOnChangeText = useCallback(
    (text: string) => setInput(text),
    [setInput]
  );

  // Формат времени
  const formatTime = useCallback((): string => {
    return new Date().toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "yours",
        messageId: uuidv4(),
        message: trimmedInput,
        time: formatTime(),
        replyText: replyMessage?.message || undefined, // Добавляем текст сообщения, на которое отвечаем
      },
    ]);

    setInput(""); // Очищаем поле ввода
    setReplyMessage(null); // Сбрасываем reply после отправки
  }, [input, setMessages, setInput, formatTime, replyMessage]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Отображение reply */}
      {replyMessage && (
        <View style={styles.replyContainer}>
          <Text style={styles.replyText}>
            Ответ на:{" "}
            {replyMessage.message
              ? replyMessage.message.length > 20
                ? `${replyMessage.message.slice(0, 20)}...`
                : replyMessage.message
              : "Сообщение недоступно"}
          </Text>
          <TouchableOpacity onPress={() => setReplyMessage(null)}>
            <Text style={styles.cancelReply}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Поле ввода */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Напишите сообщение..."
          placeholderTextColor="#A9A9A9" // Чуть светлее для комфорта
          value={input}
          onChangeText={handleOnChangeText}
        />
        <TouchableOpacity
          onPress={onSubmitEditing}
          style={styles.button}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Стили
const styles = StyleSheet.create({
  replyContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 8,
  },
  replyText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  cancelReply: {
    fontSize: 16,
    color: "#999",
    marginLeft: 8,
  },
  container: {
    backgroundColor: "white",
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  textInput: {
    flex: 1,
    padding: 12,
    color: "black",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: "#52B788",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
