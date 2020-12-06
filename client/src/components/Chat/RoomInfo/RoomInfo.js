import { Avatar, Box, Typography } from "@material-ui/core";
import React from "react";
import "./RoomInfo.css";

/* RENDERS ONLINE USERS */
function RoomInfo({ username, onlineUsers }) {
  /* MAP ALL USERS CURRENTLY ONLINE IN ROOM */
  const userList = onlineUsers.map((user) =>
    user.username === username ? (
      /* STYLES aPPLIED IF THIS USERNAME IS YOUR USERNAME */
      <div key={user.id} className="user-container">
        <Avatar src={user.profile_img} alt="" className="user-avatar" />
        <Typography variant="h6" className="current-user" color="primary">
          {user.username}
        </Typography>
      </div>
    ) : (
      <div key={user.id} className="user-container">
        <Avatar src={user.profile_img} alt="" className="user-avatar" />
        <Typography variant="body1">{user.username}</Typography>
      </div>
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
