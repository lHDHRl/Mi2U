import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// Типизация пропсов
interface MessageProps {
  type: "yours" | "theirs"; // Тип сообщения
  messageId: string;
  message: string;
  time: string;
  answerTo?: string; // ID сообщения, на которое идет ответ (опционально)
}

const Message: React.FC<MessageProps> = ({ type, messageId, message, time, answerTo }) => {
  const isYours = type === "yours"; // Определяем тип сообщения

  const handleOnPress = () => {
    console.log(`${message} has been touched`)
  }

  // return (
  //   <TouchableWithoutFeedback style={isYours ? styles.yourContainer : styles.theirContainer} onPress={handleOnPress}>
  //     {/* Блок ответа на сообщение */}
  //     {answerTo && (
  //       <Text
  //         style={isYours ? styles.yourAnswerTo : styles.theirAnswerTo}
  //         numberOfLines={1}
  //         ellipsizeMode="tail"
  //       >
  //         Ответ на: {answerTo}
  //       </Text>
  //     )}
  //     {/* Основной текст сообщения */}
  //     <Text style={styles.message}>{message}</Text>
  //     {/* Время отправки */}
  //     <Text style={styles.time}>{time}</Text>

  //     {/* Message ID (только в DEV-режиме) */}
  //     {__DEV__ && <Text style={styles.messageId}>{messageId}</Text>}
  //   </TouchableWithoutFeedback>
  // );

  return (
    <View style={isYours ? styles.yourContainer : styles.theirContainer}>
      {/* Блок ответа на сообщение */}
      {answerTo && (
        <Text
          style={isYours ? styles.yourAnswerTo : styles.theirAnswerTo}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          Ответ на: {answerTo}
        </Text>
      )}
      {/* Основной текст сообщения */}
      <Text style={styles.message}>{message}</Text>
      {/* Время отправки */}
      <Text style={styles.time}>{time}</Text>

      {/* Message ID (только в DEV-режиме) */}
      {__DEV__ && <Text style={styles.messageId}>{messageId}</Text>}
    </View>
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