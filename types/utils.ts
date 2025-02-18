export default interface messageInterface {
  type: "yours" | "theirs";
  messageId: string;
  message: string;
  time: string;
  answerTo?: string;
}