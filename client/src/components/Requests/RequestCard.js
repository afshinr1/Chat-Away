import React from "react";
import Card from "@material-ui/core/Card";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { useStyles } from "./RequestStyles";

/* REQUEST CARD COMPONENT.*/
export default function RequestCard({ data, type, handleAdd, handleCancel }) {
  const classes = useStyles();
  /* HAVE A DIFFERENT CARD CONTENT FOR EACH DIFFERENT REQUEST TYPE. ROOM, FRIEND, CHAT */
  let cardContent = null;
  if (type === "room") {
    cardContent = (
      <CardContent>
        <Typography gutterBottom variant="body1" component="h2">
          Room : {data.roomObj.roomName}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          Requested by : {data.requestedBy}
        </Typography>
      </CardContent>
    );
  } else if (type === "friend") {
    cardContent = (
      <CardContent>
        <Typography gutterBottom variant="body1" component="h2">
          {data.user} wants to be your friend.
        </Typography>
      </CardContent>
    );
  }
  else if (type === "chat") {
    cardContent = (
      <CardContent>
        <Typography gutterBottom variant="body1" component="h2">
          {data.username} Invited to private chat
        </Typography>
      </CardContent>
    );
  }
  let image = '';
  if(type === 'friend') image = "/images/friend.png";
  else if (type === 'chat') image = "/images/chat.png";
  else if (type === 'room') image = "/images/group.png";
  

  return (
    <div className={classes.card_container}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title="New Request"
        >
          <Typography
            gutterBottom
            variant="body1"
            className={classes.roomName}
            component="h2"
          >
            New Request
          </Typography>
        </CardMedia>

        {cardContent}

        <CardActions className={classes.action}>
          <IconButton
            className={`${classes.check_icon} ${classes.scale}`}
            onClick={(e) => handleAdd(data)}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            className={`${classes.cancel_icon} ${classes.scale}`}
            onClick={(e) => handleCancel(data)}
          >
            <CancelIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
