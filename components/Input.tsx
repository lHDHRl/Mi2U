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

// Определяем типы пропсов  
interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: messageInterface[];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>;
}

// Компонент ввода сообщения  
export const Input: React.FC<Props> = ({ input, setInput, messages, setMessages }) => {
  const handleOnChangeText = useCallback((text: string) => setInput(text), [setInput]);

  // Формат времени  
  const formatTime = useCallback((): string => {
    return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }, []);

  // Отправка сообщения  
  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "yours",
        messageId: Date.now().toString(), // Можно заменить на `uuid`
        message: trimmedInput,
        time: formatTime(),
      },
    ]);

    setInput(""); // Очищаем поле ввода
  }, [input, setMessages, setInput, formatTime]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Напишите сообщение..."
          placeholderTextColor="#A9A9A9" // Чуть светлее для комфорта
          value={input}
          onChangeText={handleOnChangeText}
        />
        <TouchableOpacity onPress={onSubmitEditing} style={styles.button} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.buttonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Стили  
const styles = StyleSheet.create({
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