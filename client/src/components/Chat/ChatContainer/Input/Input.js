import React, { useState } from "react";
import "./Input.css";
import { Box, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DrawModal from "./DrawModal";

/* INPUT BAR TO SEND MESSAGES */
function Input({ handleMessage }) {
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);

  const sendMessage = () => {
    if (message !== "") {
      let msgObj = { type: "text", text: message };
      handleMessage(msgObj);
      setMessage("");
    }
  };
  const handleImage = (image) => {
    let msgObj = { type: "image", text: image };
    handleMessage(msgObj);
  };

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };
  /* FOR OPENING DRAWING MODAL */
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box display="flex" component="div" className="input-form">
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="message-input"
        onKeyDown={handleEnter}
      />
      <Button
        startIcon={<BorderColorIcon />}
        color="secondary"
        variant="contained"
        onClick={handleOpen}
      >
        Draw
      </Button>

      <DrawModal
        handleImage={handleImage}
        open={open}
        handleClose={handleClose}
      />
      <Button
        className="message-button"
        color="primary"
        variant="contained"
        startIcon={<SendIcon />}
        onClick={sendMessage}
      >
        Send
      </Button>
    </Box>
  );
}

export default Input;
