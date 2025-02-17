import { View, Text, StyleSheet } from "react-native";

export default function Message(props: {
  type: "yours" | "theirs";
  messageId: string;
  message: string;
  time: string;
  answerTo?: string;
}) {
  const { type, messageId, message, time, answerTo } = props;

  const isYours = type === "yours";

  return (
    <View style={isYours ? styles.yourContainer : styles.theirContainer}>
      {answerTo && (
        <Text style={isYours ? styles.yourAnswerTo : styles.theirAnswerTo}>
          {answerTo}
        </Text>
      )}
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.messageId}>{messageId}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  yourContainer: {
    alignSelf: "flex-end",
    marginBottom: 15,
    width: 180,
    backgroundColor: "#52B788",
    padding: 8,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  theirContainer: {
    alignSelf: "flex-start",
    marginBottom: 15,
    width: 180,
    backgroundColor: "#958ED2",
    padding: 8,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  yourAnswerTo: {
    backgroundColor: "#B2E3CC",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#498467",
  },
  theirAnswerTo: {
    backgroundColor: "#B8B2EF",
    padding: 5,
    borderLeftWidth: 2,
    borderRadius: 5,
    borderLeftColor: "#934CC2",
  },
  messageId: {
    fontWeight: "500",
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