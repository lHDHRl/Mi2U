import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDoubleTap } from "../hooks/useDoubleTap";
import messageInterface from "../types/utils";
import { GestureResponderEvent } from "react-native";

// Типизация пропсов
interface MessageProps {
  type: "yours" | "theirs"; // Тип сообщения
  messageId: string; // Уникальный ID сообщения
  message: string; // Текст сообщения
  time: string; // Время отправки
  answerTo?: string; // ID сообщения, на которое идет ответ (опционально)
  setReplyMessage: React.Dispatch<
    React.SetStateAction<messageInterface | null>
  >; // Функция для установки reply
  replyText?: string; // Текст сообщения, на которое идет ответ (опционально)
  handleLongPress?: (event: GestureResponderEvent, messageId: string) => void; // Новый пропс для долгого нажатия (upd from vstaff: переделал вид хендлера - у него появились аргументы)
}

const Message: React.FC<MessageProps> = ({
  type,
  messageId,
  message,
  time,
  answerTo,
  setReplyMessage,
  replyText,
  handleLongPress,
}) => {
  const isYours = type === "yours";

  // при двойном таппе по чужопу сообщению пользователь отвечает на него
  const handleDoubleTap = useDoubleTap(() => {
    if (type === "theirs") {
      setReplyMessage({ type, messageId, message, time });
    }
  });

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={handleDoubleTap}
      onLongPress={(event: GestureResponderEvent) => {
        if (type === "yours" && handleLongPress) {
          handleLongPress(event, messageId);
        }
      }}
    >
      <View style={isYours ? styles.yourContainer : styles.theirContainer}>
        {/* Блок ответа на сообщение */}
        {replyText && (
          <Text
            style={isYours ? styles.yourAnswerTo : styles.theirAnswerTo}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Ответ на:{" "}
            {replyText.length > 20 ? `${replyText.slice(0, 20)}...` : replyText}
          </Text>
        )}
        {/* Основной текст сообщения */}
        <Text style={styles.message}>{message}</Text>
        {/* Время отправки */}
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

// Стили
const styles = StyleSheet.create({
  yourContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
    maxWidth: "75%", // Адаптивная ширина
    backgroundColor: "#52B788",
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  theirContainer: {
    alignSelf: "flex-start",
    marginBottom: 15,
    maxWidth: "75%", // Адаптивная ширина
    backgroundColor: "#958ED2",
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  yourAnswerTo: {
    backgroundColor: "#B2E3CC",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#498467",
    color: "#1E5245", // Сделал текст читаемым
    fontSize: 12,
    marginBottom: 5,
  },
  theirAnswerTo: {
    backgroundColor: "#B8B2EF",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#934CC2",
    color: "#4A3A78", // Сделал текст читаемым
    fontSize: 12,
    marginBottom: 5,
  },
  messageId: {
    fontWeight: "500",
    fontSize: 8,
    textAlign: "right",
    color: "#BBBBBB",
  },
  message: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  time: {
    color: "#E3E3E3",
    textAlign: "right",
    fontSize: 10,
    marginTop: 5,
  },
});

export default Message;
