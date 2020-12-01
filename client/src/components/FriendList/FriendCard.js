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

import { toast } from "react-toastify";
import { socket } from "../Utilities/API";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, removeFriend, setFriends } from "../../actions/MyFriendsActions";

/* FRIEND CARD COMPONENT */
export default function FriendCard({ data }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;

  const chatFriendHandler = () => {
    // TODO: redirect to page to chat with friend :D
  }
  
  const removeFriendHandler = () => {
    const sendData = {
      username: username,
      friend: data.friend,
    }

    socket.emit("remove friend", sendData, (message) => {
      toast.info("Removed Friend", {
        position: "top-center",
      });
      dispatch(removeFriend(sendData.friend));
    });
  }

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
            Friend
          </Typography>
        </CardMedia>

        <CardContent>
          <Typography gutterBottom variant="body1" component="h2">
            {data.username}
          </Typography>
        </CardContent>
        <CardActions className={classes.action}>
          <IconButton
            className={`${classes.check_icon} ${classes.scale}`}
            onClick={chatFriendHandler}
          >
            <CheckCircleIcon />
          </IconButton>
          <IconButton
            className={`${classes.cancel_icon} ${classes.scale}`}
            onClick={removeFriendHandler}
          >
            <CancelIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}