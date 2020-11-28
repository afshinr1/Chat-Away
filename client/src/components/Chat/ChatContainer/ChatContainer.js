import Input from "./Input/Input";
import React, { useEffect, useState } from "react";
import MessageBox from "./MessageBox/MessageBox";
import { socket } from "../../Utilities/API";
import "./ChatContainerStyles.css";

/** CHAT WINDOW TO SEND AND RECIEVE MESSAGES, AND DISPLAY MESSAGES IN MESSAGE BOX */
function ChatContainer({ username }) {
  const [messages, setMessages] = useState([]);

  /* ON NEW MESSAGE TO THIS ROOM, ADD TO MESSAGE LIST AND RENDER */
  useEffect(() => {
    let unmounted = false;

    socket.on("message", (message) => {
    //  console.log(message);
      if (!unmounted) {
        setMessages((messages) => [...messages, message]);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  /* SEND MESSAGE TO ROOM */
  const handleMessage = (msg) => {
    msg.username = username;
    socket.emit("sendMessage", msg);
  };

  /*RENDER MESSAGE BOX AND INPUT BOX */
  return (
    <div className="chat-outerContainer">
      <MessageBox username={username} messages={messages} />
      <Input handleMessage={handleMessage} />
    </div>
  );
}

export default ChatContainer;
