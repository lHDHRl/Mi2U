import React from "react";
import { View, TouchableHighlight, Dimensions } from "react-native";
import { StyleSheet } from "react-native";

import MessagePopupButton from "./MessagePopupButton";

interface MessagePopupProps {
  messageId: string;
  //   isShown: boolean;
  x: number; // положение попапа по оси x
  y: number; // положение попапа по оси y (у данного элемента стоит position absolute)
}

// всплывающее окно при удерживании сообщения
const MessagePopup: React.FC<MessagePopupProps> = ({
  messageId,
  //   isShown,
  x,
  y,
}) => {
  const messagePopupStyle = StyleSheet.create({
    container: {
      width: 100,
      backgroundColor: "white",
      display: "flex",
      flexDirection: "column",
      borderRadius: 5,

      position: "absolute",
      top: y,
      left: x,
      zIndex: 100000000,
    },
  });

  console.log("rendering MessagePopup");
  return (
    <View style={messagePopupStyle.container}>
      <MessagePopupButton
        onPress={() => {}}
        buttonText="Удалить"
        position="first"
      />
      <MessagePopupButton
        onPress={() => {}}
        buttonText={messageId.substring(0, 10)}
        position="middle"
      />
      <MessagePopupButton
        onPress={() => {}}
        buttonText="Ответить"
        position="last"
      />
    </View>
  );
};

export default MessagePopup;
