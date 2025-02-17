import { View } from "react-native";
import { Text } from "react-native";
import { StyleSheet } from "react-native";

export default function Message(props: {
  type: "yours" | "theirs";
  messageId: string;
  message: string;
  time: string;
  answerTo?: string;
}) {
  const { type, messageId, message, time, answerTo } = props;

  if (type === "yours") {
    return (
      <View style={yourMessageStyle.container}>
        {/* <Text style={yourMessageStyle.messageId}>{messageId}</Text> */}
        {(() => {
          if (answerTo !== undefined) {
            return <Text style={yourMessageStyle.answerTo}>{answerTo}</Text>;
          }
        })()}

        <Text style={yourMessageStyle.message}>{message}</Text>
        <Text style={yourMessageStyle.time}>{time}</Text>

        <Text style={yourMessageStyle.messageId}>{messageId}</Text>
      </View>
    );
  } else if (type === "theirs") {
    return (
      <View style={theirsMessageStyle.container}>
        {(() => {
          if (answerTo !== undefined) {
            return <Text style={theirsMessageStyle.answerTo}>{answerTo}</Text>;
          }
        })()}

        <Text style={theirsMessageStyle.message}>{message}</Text>
        <Text style={yourMessageStyle.time}>{time}</Text>
        <Text style={theirsMessageStyle.messageId}>{messageId}</Text>
      </View>
    );
  }
}

const yourMessageStyle = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginBottom: 15,
    width: 180,
    backgroundColor: "#52B788",
    padding: 8,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },

  answerTo: {
    backgroundColor: "#B2E3CC",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#498467",
  },

  messageId: {
    fontWeight: 500,
    fontSize: 8,
    textAlign: "right",
  },

  message: {
    color: "#E3E3E3",
  },

  time: {
    color: "#E3E3E3",
    textAlign: "right",
    fontSize: 8,
  },
});

const theirsMessageStyle = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    marginBottom: 15,
    width: 180,
    backgroundColor: "#958ED2",
    padding: 8,

    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  answerTo: {
    backgroundColor: "#B8B2EF",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#934CC2",
  },

  messageId: {
    // fontFamily: "Inter",
    // color: "red",
    fontWeight: 500,
    fontSize: 8,
    textAlign: "right",
  },

  message: {
    color: "#E3E3E3",
  },

  time: {
    color: "#E3E3E3",
    textAlign: "right",
    fontSize: 8,
  },
});
