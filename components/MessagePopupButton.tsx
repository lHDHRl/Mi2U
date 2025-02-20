import React from "react";
import { TouchableHighlight, View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { GestureResponderEvent } from "react-native";

interface MessagePopupButtonProps {
  onPress: () => void; // функция срабатывающая при нажатии на кнопку (пока ничего)
  position: "first" | "middle" | "last"; // позиция кнопки внутри всплывающего окна (first - первая; middle - средняя; last - последняя)
  buttonText: string; // текст кнопки
}

// кнопка на всплывающем окне (всплывающее окно возникает при удерживании сообщения)
const MessagePopupButton: React.FC<MessagePopupButtonProps> = ({
  onPress,
  buttonText,
  position,
}) => {
  // с помощью этого стейта дизайн меняется динамически - в зависимости от того
  // нажата ли кнопка или нет
  const [isPressed, setIsPressed] = useState(false);

  // стилизация получилась громоздкой
  // тем не менее - выглядит плюс минус нормально
  const messagePopupButtonStyle = StyleSheet.create({
    container: {
      padding: 5,
    },

    first: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomWidth: 1,
      borderBottomColor: "#E3E3E3",
    },

    firstPressed: {
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomWidth: 1,
      backgroundColor: "#958ED2",
    },

    middle: {
      borderBottomWidth: 1,
      borderBottomColor: "#E3E3E3",
    },

    middlePressed: {
      borderBottomWidth: 1,
      backgroundColor: "#958ED2",
    },

    last: {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    },

    lastPressed: {
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      backgroundColor: "#958ED2",
    },

    buttonText: {
      color: "#E3E3E3",
      textAlign: "center",
    },
  });
  return (
    <TouchableHighlight
      onShowUnderlay={() => setIsPressed(true)} // без этого не будет работать динамическая стилизация при нажатии на кнопку
      onHideUnderlay={() => setIsPressed(false)} // и этого тоже
      onPress={onPress}
      underlayColor={"transparent"}
    >
      <View
        style={[ // с помощью условного рендеринга выбираем нужную стилизацию
          messagePopupButtonStyle.container,
          position === "first" && messagePopupButtonStyle.first,
          position === "last" && messagePopupButtonStyle.last,
          position === "middle" && messagePopupButtonStyle.middle,
          position === "first" &&
            isPressed &&
            messagePopupButtonStyle.firstPressed,
          position === "middle" &&
            isPressed &&
            messagePopupButtonStyle.middlePressed,
          position === "last" &&
            isPressed &&
            messagePopupButtonStyle.lastPressed,
        ]}
      >
        <Text style={messagePopupButtonStyle.buttonText}>{buttonText}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default MessagePopupButton;
