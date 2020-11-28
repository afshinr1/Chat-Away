const moment = require("moment");

/* NOT USED CURRENTLY */
let messages = [];

/* NOT USED CURRENTLY */
const addMessage = (message) => {
  let text = message.text;
  let uname = message.username;
  let color = message.color;
  let date = moment().format("h:mm:ss a");
  const newMsg = { text: text, username: uname, color: color, date: date };

  messages.push(newMsg);
  if (messages.length >= 200) {
    messages.shift();
  }
  return newMsg;
};

/* NOT USED CURRENTLY */
const changeMessageColor = (username, newColor) => {
  messages.forEach((message) => {
    if (message.username === username) {
      message.color = newColor;
    }
  });
};

/* NOT USED CURRENTLY */
const changeMessageNames = (username, newName) => {
  // messages.forEach((message) => {
  //   if (message.username === username) {
  //     message.username = newName;
  //   }
  // });
};

/** USED **/
const createMessage = (type, text, username, profilePic) => {
  return {
    text: text,
    username: username,
    color: "000000",
    type : type,
    profilePic : profilePic,
    date: moment().format("h:mm:ss a"),
  };
};

/* NOT USED CURRENTLY */
const getMessages = () => {
  if (messages.length >= 200) {
    messages.shift();
  }
  return messages;
};

module.exports = {
  createMessage,
  addMessage,
  getMessages,
  changeMessageNames,
  changeMessageColor,
};
