import { Box, Typography } from "@material-ui/core";
import React, { } from "react";
import "./RoomInfo.css";

/* RENDERS ONLINE USERS */
function RoomInfo({ username, onlineUsers }) {

  /* MAP ALL USERS CURRENTLY ONLINE IN ROOM */
  const userList = onlineUsers.map((user) =>
    user.username === username ? (
      /* STYLES aPPLIED IF THIS USERNAME IS YOUR USERNAME */
      <Typography variant="h4" color="primary" key={user.id}>
        {user.username}
      </Typography>
    ) : (
      <Typography variant="body1" key={user.id}>
        {user.username}
      </Typography>
    )
  );

  return (
    <Box component="div" className="roomInfo_container">
      <Typography variant="h5" size="large" className="header">
        Online
      </Typography>
      <Box component="div" className="onlineUsers">
        {userList}
      </Box>
    </Box>
  );
}

export default RoomInfo;
