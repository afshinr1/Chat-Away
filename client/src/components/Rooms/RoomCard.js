import { Card, CardActionArea, CardHeader } from "@material-ui/core";
import React from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import RoomIcon from "@material-ui/icons/Room";
import HttpsIcon from "@material-ui/icons/Https";
import { useStyles } from "./RoomsStyles";

function RoomCard({ room }) {
    const classes = useStyles();

  return (
    <Card key={room.roomName} className={classes.card}>
      <CardActionArea onClick={(e) => alert(room.uuid)}>
        <CardHeader
          avatar={<RoomIcon />}
          action={
            room.roomType === "public" ? (
              <HttpsIcon className={classes.cardHeader} />
            ) : (
              <LockOpenIcon className={classes.cardHeader} />
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
