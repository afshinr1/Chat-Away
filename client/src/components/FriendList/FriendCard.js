import React from "react";
import Card from "@material-ui/core/Card";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import { useStyles } from "../Requests/RequestStyles";

/* REQUEST CARD COMPONENT. (PRIMARILY USED FOR ROOMS)*/
export default function FriendCard({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.card_container}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image="/images/group.png"
          title="Contemplative Reptile"
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

        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            User: {data.user.username}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
          <IconButton
            className={`${classes.check_icon} ${classes.scale}`}
            onClick={(e) => null}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            className={`${classes.cancel_icon} ${classes.scale}`}
            onClick={(e) => null}
          >
            <CancelIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}