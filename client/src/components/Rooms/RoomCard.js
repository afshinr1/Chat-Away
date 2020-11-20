import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import RoomIcon from "@material-ui/icons/Room";
import HttpsIcon from "@material-ui/icons/Https";
import { useStyles } from "./RoomsStyles";
import { history } from "../Utilities/History";

/* ROOM CARD */
function RoomCard({ room }) {
  const classes = useStyles();

  /* ONCLICK A ROOM CARD, GO TO CHAT WINDOW FOR THE ROOM */
  const handleClick = (e) => {
    e.preventDefault();
    history.push(
      `/chat/${room.uuid}?name=${room.roomName}&type=${room.roomType}&host=${room.host}`
    );
  };

  return (
    <Card key={room.roomName} className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          avatar={<RoomIcon />}
          action={
            /* SHOW DIFFERENT ICON IF ROOM IS PRIVATE OR PUBLIC */
            room.roomType === "public" ? (
              <LockOpenIcon className={classes.cardHeader} />
            ) : (
              <HttpsIcon className={classes.cardHeader} />
            )
          }
          title={room.roomName}
          subheader={"Host: " + room.host}
        />
      </CardActionArea>
    </Card>
  );
}

export default RoomCard;
