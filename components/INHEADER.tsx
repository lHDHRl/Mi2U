import React, { useCallback } from "react"; // useCallback чтобы каждый раз не перерендировался список
import {
  View,
  TextInput,
  Text,
  TouchableOpacity, //для создания нажимаемых областей
  StyleSheet,
  Keyboard,
  SafeAreaView,
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
  const handleOnChangeText = useCallback((text: string) => setInput(text), [setInput]);

  // исправил у danil формат вывода времени  
  const formatTime = useCallback((): string => {
    return new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
  }, []);
  // как только пользователь отправляет сообщение 
  const onSubmitEditing = useCallback(() => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;
  
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        type: "yours",
        messageId: Date.now().toString(),
        message: trimmedInput,
        time: formatTime(),
      },
    ]);

    // console.log("Message sent:", newMessage);
    setInput(""); // очищаем поле ввода 
    // строка ниже нужна (я так понял) чтобы выходить из клавы при отправке 
    // убрал, потому что неудобно 
    // Keyboard.dismiss(); // Dismiss keyboard after sending
  }, [input, setMessages, setInput, formatTime]);

  return (
    <SafeAreaView style={[styles.container]}>
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        multiline
        placeholder="Напишите сообщение..."
        placeholderTextColor="#696969"
        value={input}
        onChangeText={handleOnChangeText}
      />
      <TouchableOpacity onPress={onSubmitEditing} style={styles.button}>
        <Text style={styles.buttonText}>{">"}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
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
    padding: 10,
    color: "black",
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    textAlignVertical: "top",
    fontSize: 16,
  },
  button: {
    padding: 10,
    backgroundColor: "#52B788",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// Шапка приложения
export function Header() {
  return (
    <SafeAreaView style={headerStyle.container}>
      <Text style={headerStyle.text}>mi2U</Text>
    </SafeAreaView>
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
