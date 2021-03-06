import React, { useRef, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";
import Message from "./Message";

/* MESSAGE BOX HEIGHT, TILL SCROLL BAR APPEARS */
const useStyles = makeStyles({
  scroll: {
    overflowY: "auto",
    flex: "auto",
    maxHeight: "72vh",
  },
});

/* MESSAGE BOX WINDOW COMPONENT*/
function MessageBox({ username, messages }) {
  const classes = useStyles();
  const messageEl = useRef(null);

  /* USED FOR SCROLLING TO BOTTOM AUTOMATICALLY ON NEW MESSAGE */
  useEffect(() => {
    if (messageEl) {
      messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);

  /* MAP ALL MESSAGES */
  const text = messages.map((message, i) => (
    <div key={i}>
      {" "}
      <Message message={message} username={username} />
    </div>
  ));

  /* RENDER ALL MESSAGES  */
  return (
    <Box ref={messageEl} className={classes.scroll}>
      <div className={classes.messages}>{text}</div>
    </Box>
  );
}

export default MessageBox;
