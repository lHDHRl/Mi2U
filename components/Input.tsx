import { View } from "react-native";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import messageInterface from "../types/utils";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";

export default function Input(props: {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  messages: messageInterface[] | [];
  setMessages: React.Dispatch<React.SetStateAction<messageInterface[] | []>>;
}) {
  const { input, setInput, messages, setMessages } = props;

  const handleOnChangeText = (text: string) => setInput(text);

  const onSubmitEditing = () => {
    const newMessageInterface: messageInterface = {
      type: "yours",
      messageId: Date.now().toString(),
      message: input,
      time:
        new Date().getHours().toLocaleString() +
        ":" +
        new Date().getMinutes().toLocaleString(),
    };
    console.log("in on submitting editting");
    setMessages((oldMessages) => [...oldMessages, newMessageInterface]);
    setInput("");
  };

  return (
    <View id="text-input" style={myTextInputStyle.container_input}>
      <TextInput
        style={myTextInputStyle.textInput_input}
        multiline={true}
        placeholderTextColor={"#A4A4A4"}
        placeholder="Введите текст:"
        value={input}
        onChangeText={handleOnChangeText}
        onSubmitEditing={onSubmitEditing}
      ></TextInput>
      <TouchableOpacity
        onPress={onSubmitEditing}
        style={myTextInputStyle.button}
      >
        <Text style={{ color: "white" }}>{">"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const myTextInputStyle = StyleSheet.create({
  container_input: {
    backgroundColor: "white",
    width: "100%",
  },
  textInput_input: {
    color: "black",
    padding: 10,
    textAlign: "left",
    textAlignVertical: "top",
  },
  button: {
    padding: 10,
    backgroundColor: "#52B788",
    color: "#fff",
  },
});

const headerStyle = StyleSheet.create({
  container_header: {
    backgroundColor: "#934CC2",
    padding: 5,
    flexDirection: "row",
    flex: 1,
  },
  text_header: {
    fontSize: 20,
    color: "#B8B2EF",
  },
});
