import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import { useStyles } from "./PublicRoomStyles";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";

export default function PublicRoomCard({
  room,
  exists,
  handleJoinRoom,
  handleError,
}) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {room.roomName[0].toUpperCase()}
          </Avatar>
        }
        action={
          exists ? (
            <IconButton onClick={handleError} className={classes.iconBtnErr}>
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              className={classes.iconBtn}
              onClick={(e) => handleJoinRoom(room)}
            >
              <AddCircleIcon />
            </IconButton>
          )
        }
        title={room.roomName}
        subheader={`Host : ${room.host}`}
      />
    </Card>
  );
}
