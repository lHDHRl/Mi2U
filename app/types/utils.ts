export default interface messageInterface {
  type: "yours" | "theirs";
  messageId: string;
  message: string;
  time: string;
  answerTo?: string;
  checkBoxValue: boolean, // VSTAFF - выбрано сообщение или нет для удаления 
}
