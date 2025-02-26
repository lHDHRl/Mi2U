import { TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCheck, } from "@fortawesome/free-solid-svg-icons/faCheck"


interface CheckBoxProps {
  messageId: string;
  value: boolean;
  //   setValue: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnPress: () => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  messageId,
  value,
  handleOnPress,
}) => {
  const checkBoxStyle = StyleSheet.create({
    container: {
      width: 25,
      aspectRatio: "1/1",
      borderRadius: 50,
      borderWidth: 2,
      borderColor: "white",
      color: "white",
      backgroundColor: "transparent",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",

      position: "absolute",
      top: "40%",
      left: "2%",

      zIndex: 100,
    },

    text: {
      color: "white",
    },
  });

  return (
    <TouchableWithoutFeedback
        // style={checkBoxStyle.container}
      onPress={() => {
        console.log("onPress in CheckBox.tsx");
        handleOnPress();
      }}
    >
      <View style={checkBoxStyle.container}>
        {/* {value && <Text style={checkBoxStyle.text}>✔️</Text>} */}
        {value && <FontAwesomeIcon icon={faCheck} color="white" />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CheckBox;
