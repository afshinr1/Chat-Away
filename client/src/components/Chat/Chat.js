import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BackButton, useStyles } from "./ChatStyles";
import { history } from "../Utilities/History";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation } from "react-router-dom";
import ChatContainer from "./ChatContainer/ChatContainer";
import { socket } from "../Utilities/API";

/* MAIN CHAT WINDOW */
function Chat() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomName = query.get("name");
  const classes = useStyles();
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const { room } = useParams();

  /* ON CLICKING ON A ROOM, JOIN THE ROOM BY EMITING TO SERVER JOIN EVENT */
  useEffect(() => {
    // console.log(room);
    // console.log(username);

    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });

    /* ON LEAVING ROOM, TELL SERVER TO LEAVE ROOM */
    return function cleanup() {
      socket.emit("leave room", username);
    };
  }, [room, username]);

  return (
    <Box component="div" width="fullWidth" className={classes.outerContainer}>
      {/*Navbar component */}
      <Navbar />

      {/* Go back Button and Room name display */}
      <Box component="div" display="flex" alignItems="center">
        <BackButton
          onClick={(e) => history.goBack()}
          variant="outlined"
          className={classes.btn}
          startIcon={<ArrowBackIcon />}
        >
          Go Back
        </BackButton>
        <Typography color="inherit" display="inline" variant="h5">
          Room Name : {roomName}
        </Typography>
      </Box>

      {/*  RENDER  3 COLUMNS FOR CHAT WINDOWN. */}

      <Grid container className={classes.innerContainer}>
        {/*COL 1:  ADD NEW PESRON/ KICK PERSON FROM ROOM? */}
        <Grid item xs={2} style={{ border: "1px solid blue" }}></Grid>

        {/*COL 2:  CHAT AREA. SEND AND RECIEVE MESSAGES*/}
        <Grid item xs={8} style={{ border: "1px solid green" }}>
          <ChatContainer username={username} />
        </Grid>

        {/*COL 3:  RENDER ALL PEOPLE IN ROOM?*/}
        <Grid item xs={2} style={{ border: "1px solid red" }}></Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
