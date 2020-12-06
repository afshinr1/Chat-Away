import React from "react";
import Card from "@material-ui/core/Card";
import DeleteIcon from "@material-ui/icons/Delete";
import { Avatar, CardHeader, IconButton } from "@material-ui/core";
import { useStyles } from "./FriendStyles";
import ChatIcon from "@material-ui/icons/Chat";
import { toast } from "react-toastify";
import { socket } from "../Utilities/API";
import { useDispatch } from "react-redux";
import { removeFriend } from "../../actions/MyFriendsActions";
import { v4 } from "uuid";
import { history } from "../Utilities/History";

/* FRIEND CARD COMPONENT */
export default function FriendCard({ friend }) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;

  /* ONCLICKING CHAT ICON. SEND REQUEST TO FRIEND AND GO TO PRIVATE ROOM */
  const chatFriendHandler = () => {
    const randomRoom = v4();
    const sendData = {
      randomRoom,
      friend: friend.username,
      username,
      requestId : v4(),
      type: "chat",
    };
    socket.emit("private chat", sendData, (response) => {
      if (response === "OK") {
        history.push(
          `/chat/${randomRoom}?name=Private Chat&type=chat&host=Administrator`
        );
      }else {
        toast.error(response, {
          position : 'top-center'
        });
      }
    });
  };
  /* HANDLE REMOVING A FRIEND */
  const removeFriendHandler = () => {
    const sendData = {
      username: username,
      friend: friend.username,
    };

    socket.emit("remove friend", sendData, (message) => {
      toast.info("Removed Friend", {
        position: "top-center",
      });
      dispatch(removeFriend(friend.username));
    });
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar src={friend.profileimg}></Avatar>}
        action={
          <>
            <IconButton
              className={classes.chatIcon}
              onClick={chatFriendHandler}
            >
              <ChatIcon />
            </IconButton>

            <IconButton
              onClick={removeFriendHandler}
              className={classes.iconBtnErr}
            >
              <DeleteIcon />
            </IconButton>
          </>
        }
        title={friend.username}
        subheader={`${friend.firstname}  ${friend.lastname}`}
      />
    </Card>
  );
}
