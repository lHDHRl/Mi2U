import React, { useCallback } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import messageInterface from "../types/utils";

// текстовое поле ввода сообщения 
export function Input(props: {
  input: string; // текст введенный в поле ввода 
  setInput: React.Dispatch<React.SetStateAction<string>>; // для обработки изменения текста в поле ввода 
  messages: messageInterface[]; // массив отправленных пользователем сообщений
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[]>>; // для обработки изменения массива сообщений 
}) {
  const { input, setInput, messages, setMessages } = props;

  // Обработка изменений в поле ввода 
  const handleOnChangeText = useCallback((text: string) => setInput(text), []);

  // исправил у danil формат вывода времени  
  const formatTime = (): string => {
    // текущее время в формате hh:mm
    const currentTime = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    return currentTime
  };
  // как только пользователь отправляет сообщение 
  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return; // чекаем чтобы он не отправлял пустую строку 

    // создаем объект интерфейса чтобы хранить информацию о новом созданном сообщении 
    const newMessage: messageInterface = {
      type: "yours",
      messageId: Date.now().toString(),
      message: trimmedInput,
      time: formatTime(),
    };

    // console.log("Message sent:", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]); // внесение нового сообщения 
    setInput(""); // очищаем поле ввода 
    // строка ниже нужна (я так понял) чтобы выходить из клавы при отправке 
    // убрал, потому что неудобно 
    // Keyboard.dismiss(); // Dismiss keyboard after sending
  }, [input, setMessages, setInput]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Напишите сообщение..."
        placeholderTextColor="#A4A4A4"
        value={input}
        onChangeText={handleOnChangeText}
      />
      <TouchableOpacity onPress={onSubmitEditing} style={styles.button}>
        <Text style={styles.buttonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    width: "100%",
  },
  textInput: {
    flex: 1,
    color: "black",
    paddingVertical: 12,
    paddingHorizontal: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#52B788",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

// Шапка приложения
export function Header() {
  return (
    <View style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </View>
  );
}

const headerStyle = StyleSheet.create({
  container: {
    backgroundColor: "#934CC2",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B8B2EF",
  },
});