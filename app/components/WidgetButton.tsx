/*
здесь компонент, для кнопок внутри виджета, пока что 
без функционала - просто оболчки
*/

import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, Text } from "react-native";
import STYLES from "../styles/STYLES";

// Типизация аргументов ф.к. (функ. комп.)
export interface widgetButtonProps {
  // чтобы определять была ли кнопка нажата или нет (зачем нужно читай в Widget)
  setWasWidgetButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
  buttonText: string; // текст кнопки 
  handleOnPress: () => void; // обработчик нажатия на кнопку 
  position: "first" | "middle" | "last"; // позиция кнопки в виджете (от этого зависит её стилизация)
}

const WidgetButton: React.FC<widgetButtonProps> = ({
  setWasWidgetButtonPressed,
  buttonText,
  handleOnPress,
  position,
}) => {
  const basicStyle = { // стилек базовый 
    backgroundColor: STYLES.COLORS.widget_button_background,
    paddingHorizontal: 20,
    paddingVertical: 5,
    // flex: 1,
  };

  const opacityOnPressValue = 0.8; // значение прозрачность при нажатии 
  // на основе базового стиля создается модифицированный - основной 
  // зависящий от положения кнопки в виджете 
  let modifiedStyle: { [key: string]: any } = { ...basicStyle }; 

  // если первый то скругления сверху
  // если последний то сгругления внизу + между кнопками границы 
  if (position === "first") {
    modifiedStyle = {
      ...modifiedStyle,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
    };
  } else if (position === "last") {
    modifiedStyle = {
      ...modifiedStyle,
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
    };
  }
  if (position !== "last") {
    modifiedStyle = {
      ...modifiedStyle,
      borderBottomWidth: 0.5,
      borderColor: STYLES.COLORS.widget_button_border,
    };
  }

  const widgetButtonStyle = StyleSheet.create({ // финальный стилек 
    container: { ...modifiedStyle },
  });

  return (
    <TouchableOpacity
      activeOpacity={opacityOnPressValue}
      style={widgetButtonStyle.container}
      onPressIn={() => {
        console.log("onPressIn in widgetButton")
        setWasWidgetButtonPressed(true); // хз нахуя я дублировал пусть будет
        // handleOnPress();
      }}
      onPressOut={() => {
        console.log("onPressOut in widgetButton")
        setWasWidgetButtonPressed(true); // хз нахуя я дублировал пусть будет
        handleOnPress(); // когда поднимает палец запускаем функцию обработчик нажатия 
      }}
    >
      <Text>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default WidgetButton;
