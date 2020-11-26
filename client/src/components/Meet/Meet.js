import { Box } from "@material-ui/core";
import React, { useState } from "react";
import { MeetButton, useStyles } from "./MeetStyles";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import { history } from "../Utilities/History";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

/* THIRD COLUMN IN MAIN PAGE. PROFILE BUTTON AND MEET SOMEONE NEW */
function Meet() {
 // const username = JSON.parse(sessionStorage.getItem("user")).username;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
 const handleToggle = () => {
    setOpen(!open);
  };


  return (
    <Box
      className={classes.meet_container}
      component="div"
      textAlign="center"
      flexDirection="column"
    >
      <input
        type="image"
        alt="logo"
        className={classes.btn_logo}
        onClick={(e) => history.push("/profile")}
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
      />

      {/* DO SOMETHING ONCLICK*/}
      <MeetButton onClick={handleToggle}>
     
        Meet Someone New!
        <ChatBubbleIcon className={classes.speechIcon} />
      </MeetButton>

      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </Box>
  );
}

export default Meet;
