import React, { useState } from "react";
import "./Input.css";
import { Box, Button, IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DrawModal from "./DrawModal";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import { useStyles } from "./Styles";

/* INPUT BAR TO SEND MESSAGES */
function Input({ handleMessage }) {
  const classes = useStyles();
  const profilePic = JSON.parse(sessionStorage.getItem('user')).profile_img;
  const [message, setMessage] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openEmoji, setOpenEmoji] = useState(false);

  /* HANDLE PICKING AN EMOJI/EMOJI CLICK */
  const onEmojiClick = (event, emojiObject) => {
    setMessage((oldMsg) => oldMsg + emojiObject.emoji);
  };
  /* HANDLE SHOW EMOJI PICKER */
  const handleEmojiShow = (e) => {
    setOpenEmoji(!openEmoji);
  };

  /* SEND MESSAGE TO SERVER */
  const sendMessage = () => {
    if (message !== "") {
      let msgObj = { type: "text", text: message, profilePic : profilePic };
      handleMessage(msgObj);
      setMessage("");
    }
  };

  /* SEND IMAGE TO SERVER */
  const handleImage = (image) => {
    let msgObj = { type: "image", text: image, profilePic : profilePic };
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
      {/* MAIN INPUT FOR SENDING TEXT MESSAGES */}
      <input
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="message-input"
        onKeyDown={handleEnter}
      />

      {/* RENDER EMOJI PICKER */}
      <div className="emoji-picker">
        <IconButton className={classes.emojiBtn} onClick={handleEmojiShow}>
          <EmojiEmotionsIcon />
        </IconButton>
        <div className={`picker ${openEmoji && "show"}`}>
          <Picker onEmojiClick={onEmojiClick} />
        </div>
      </div>

      {/* OPEN DRAWING MODAL TO SEND DRAWINGS */}
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

      {/* SEND BUTTON */}
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
