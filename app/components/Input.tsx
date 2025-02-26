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
import STYLES from "../styles/STYLES";

// Определяем типы пропсов
interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
  replyMessage: messageInterface | null;
  setReplyMessage: React.Dispatch<
    React.SetStateAction<messageInterface | null>
  >;
  sendMessageToServer: (message: messageInterface) => void;
}

// Компонент ввода сообщения
export const Input: React.FC<Props> = ({
  input,
  setInput,
  messages,
  setMessages,
  replyMessage,
  sendMessageToServer,
  setReplyMessage,
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

  // В этой функции написан пиздец желательно переделать нахуй тут все
  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const newMessage = {
      type: "yours" as const,
      messageId: uuidv4(),
      message: trimmedInput,
      time: formatTime(),
      replyText: replyMessage?.message || undefined,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");
    sendMessageToServer(newMessage);
    setReplyMessage(null);
  }, [
    input,
    setMessages,
    setInput,
    formatTime,
    replyMessage,
    sendMessageToServer,
  ]);

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
          placeholderTextColor="#A9A9A9"
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
    backgroundColor: STYLES.COLORS.reply_background,
    borderRadius: 8,
    marginBottom: 8,
  },
  replyText: {
    flex: 1,
    fontSize: 14,
    color: STYLES.COLORS.reply_text,
  },
  cancelReply: {
    fontSize: 16,
    color: STYLES.COLORS.cancel_reply_text,
    marginLeft: 8,
  },
  container: {
    backgroundColor: STYLES.COLORS.input_container_background,
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
    color: STYLES.COLORS.input_text,
    backgroundColor: STYLES.COLORS.input_background,
    borderRadius: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    padding: 12,
    backgroundColor: STYLES.COLORS.send_button_background,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: STYLES.COLORS.send_button_text,
    fontSize: 18,
    fontWeight: "bold",
  },
});
