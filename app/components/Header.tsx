import { Text, StyleSheet, SafeAreaView, View, Button } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

interface HeaderButtonProps {
  title: string; // текст кнопки 
  onPress: () => void; // что происходит по нажатии
}

// кнопки в шапке, появляющиеся когда активирован режим выбора нескольких сообщений
const HeaderButton: React.FC<HeaderButtonProps> = ({ title, onPress }) => {
  const headerButtonStyle = StyleSheet.create({
    container: {
      paddingVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 5,
      backgroundColor: "purple",
    },

    text: {
      color: "white",
    },
  });

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      style={headerButtonStyle.container}
    >
      <Text style={headerButtonStyle.text}>{title}</Text>
    </TouchableWithoutFeedback>
  );
};

interface HeaderProps {
  selectMultipleMessagesMode: boolean;
  cancelHandler: () => void;
  deleteHandler: () => void;
}

const Header: React.FC<HeaderProps> = ({
  selectMultipleMessagesMode,
  cancelHandler,
  deleteHandler,
}) => {
  const headerStyle = StyleSheet.create({
    container: {
      backgroundColor: "#934CC2",
      padding: 10,
      // flexDirection: "row",
      // justifyContent: "center", // VSTAFF - убрал чтобы кнопки расположились по сторонам
      // alignItems: "center",

      // borderColor: "#B8B2EF",
      // borderWidth: 1,
    },
    text: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#B8B2EF",
      textAlign: "center",
    },

    button: {
      backgroundColor: "transparent",
      color: "white",
      textTransform: "none",
    },
  });

  return (
    <SafeAreaView style={headerStyle.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: selectMultipleMessagesMode
            ? "space-between"
            : "center",
          // borderColor: "white",
          // borderWidth: 1,
        }}
      >
        {selectMultipleMessagesMode && (
          <HeaderButton
            title="Cancel"
            onPress={cancelHandler}
          />
        )}
        <Text style={headerStyle.text}>mi2U</Text>
        {selectMultipleMessagesMode && (
          <HeaderButton
            title="Delete"
            onPress={deleteHandler}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default Header;
