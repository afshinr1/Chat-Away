import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import RoomIcon from "@material-ui/icons/Room";
import HttpsIcon from "@material-ui/icons/Https";
import { useStyles } from "./RoomsStyles";
import {history} from '../Utilities/History'

function RoomCard({ room }) {
    const classes = useStyles();

    const handleClick = (e) => {
      e.preventDefault();
      history.push(`/chat/${room.uuid}?name=${room.roomName}`)
    }

  return (
    <Card key={room.roomName} className={classes.card}>
      <CardActionArea onClick={handleClick}>
        <CardHeader
          avatar={<RoomIcon />}
          action={
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
