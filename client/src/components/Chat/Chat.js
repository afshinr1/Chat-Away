import { Box, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { BackButton, useStyles } from "./ChatStyles";
import { history } from "../Utilities/History";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useLocation } from "react-router-dom";
import ChatContainer from "./ChatContainer/ChatContainer";
import { socket } from "../Utilities/API";
import RoomInfo from "./RoomInfo/RoomInfo";
import Miscellaneous from "./Miscellaneous/Miscellaneous";
import { toast } from "react-toastify";

/* MAIN CHAT WINDOW */
function Chat() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const roomName = query.get("name");
  const type = query.get("type");
  const host = query.get("host");
  const classes = useStyles();
  const [onlineUsers, setonlineUsers] = useState([]);

  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const { room } = useParams();
  const roomObj = { roomType: type, host, roomName, uuid: room };

  useEffect(() => {
    // console.log(room);
    // console.log(username);

    /* ON CLICKING ON A ROOM, JOIN THE ROOM BY EMITING TO SERVER JOIN EVENT WITH USERNAME AND ROOM UUID*/
    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
        history.push("/");
      }
    });

    /* ON LEAVING ROOM, TELL SERVER THIS USERNAME TO LEAVE ROOM */
    return function cleanup() {
      socket.emit("leave room", username);
    };
  }, [room, username]);

  useEffect(() => {
    /* SET THE ONLINE USERS ON THIS EVENT. GETS THIS EVENT WHEN FIRST JOINING A ROOM AND WHEN A USER LEAVES THE ROOM */
    let unmounted = false;
    socket.on("roomData", (data) => {
      // console.log("Got room data");
      // console.log(data);
      if (!unmounted) setonlineUsers(data.users);
    });

    /* GOT KICKED, LEAVE ROOM */
    socket.on("got kicked", (obj) => {
      history.push("/");
      toast.error("Got Kicked From The Room!", {
        position: "top-center",
      });
    });

    return () => {
      unmounted = true;
    };
  }, []);

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
          Back
        </BackButton>
        <Typography color="inherit" display="inline" variant="h5">
          Room Name : {roomName}
        </Typography>
      </Box>

      {/*  RENDER  3 COLUMNS FOR CHAT WINDOWN. */}

      <Grid container className={classes.innerContainer}>
        {/*COL 1:  ADD NEW PESRON/ KICK PERSON FROM ROOM? */}
        <Grid item xs={2} className={classes.col1}>
          <Miscellaneous
            onlineUsers={onlineUsers}
            host={host}
            roomObj={roomObj}
          />
        </Grid>

        {/*COL 2:  CHAT AREA. SEND AND RECIEVE MESSAGES*/}
        <Grid item xs={8} className={classes.col2}>
          <ChatContainer username={username} />
        </Grid>

        {/*COL 3:  RENDER ALL PEOPLE IN ROOM?*/}
        <Grid item xs={2} className={classes.col3}>
          <RoomInfo onlineUsers={onlineUsers} username={username} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Chat;
