/*
в этом файле содержится компонент для виджета - всплывающего окна, возникающего 
при удерживании на сообщение 
*/
import React from "react";
import WidgetButton from "./WidgetButton";
import { widgetButtonProps as widgetButton } from "./WidgetButton";
import { View, StyleSheet } from "react-native";

// для типизации аргументов в функциональном компоненте 
interface widgetProps {
  // handleOnLongPress: () => void;
  // чтобы указать, что была нажата кнопка на виджете
  // важно понимать когда была нажата кнопка на виджете, чтобы можно было 
  // отличить нажатия экрана, по которым можно закрыть виджет, и по которым 
  // нельзя 
  setWasWidgetButtonPressed: React.Dispatch<React.SetStateAction<boolean>>; 
  widgetButtons: widgetButton[]; // массив для создания кнопок на виджете
  x: number; // координаты виджета по Х и У и Й
  y: number;
}

const Widget: React.FC<widgetProps> = ({
  widgetButtons,
  x,
  y,
  setWasWidgetButtonPressed,
}) => { 
  const widgetStyle = StyleSheet.create({ // стилек для виджета 
    container: {
      // maxWidth: 100,
      display: "flex", // эта и 2 строки ниже нужны чтобы кнопки не занимали всю ширину экрана, а лишь необходимый им размер (ну плюс еще паддинги)
      flexDirection: "column",
      flexWrap: "wrap",
      position: "absolute", // чтобы виджет располагался динамично
      left: x,
      top: y,
    },
  });

  return (
    <View style={widgetStyle.container}>
      {Object.values(widgetButtons).map((widgetButtonInfo) => { // рендерим кнопки
        const { buttonText, position, handleOnPress } = widgetButtonInfo;

        return (
          <WidgetButton // см. внутри 
            setWasWidgetButtonPressed={setWasWidgetButtonPressed}
            key={buttonText}
            buttonText={buttonText}
            position={position}
            handleOnPress={handleOnPress}
          />
        );
      })}
    </View>
  );
};

export default Widget;
