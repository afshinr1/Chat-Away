import React, { useEffect, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { socket } from "../Utilities/API";
import { useSelector, useDispatch } from "react-redux";
import { setFriends } from "../../actions/MyFriendsActions";
import Button from "@material-ui/core/Button";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { toast, Flip } from "react-toastify";
import { useStyles } from "./FriendStyles";
import { useStyles as useStylesRequest } from "../Requests/RequestStyles";

import FriendCard from "./FriendCard";
import { v4 } from "uuid";

function FriendList() {
  const classes = useStyles();
  const classesRequest = useStylesRequest();

  const dispatch = useDispatch();
  const friends = useSelector((state) => state.MyFriendsReducer.friends);

  const [friendName, setFriendName] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const { username, firstName, lastName, profile_img } = user;
  const friendNames = friends.map((friend) => {
    return friend.username === username ? friend.friend : friend.username;
  });

  /* GET FRIENDS FOR USER ON RENDER */
  useEffect(() => {
    let unmounted = false;

    socket.emit("get friends", username, (friends) => {
      // console.log(friends);
      if (!unmounted) {
        dispatch(setFriends(friends));
      }
    });

    return () => {
      unmounted = true;
    };
  }, [username, dispatch]);

  /* HANDLE CHANGING FRIEND NAME INPUT */
  const onChangeHandler = (event) => {
    let name = event.target.value.trim();
    if (name === "") {
      setFriendName("");
      return;
    }
    setFriendName(name);
  };

  /* HANDLE ADDING A FRIEND. IF INPUT FRIEND IS ALREADY A FRIEND/NOT ONLINE, SHOW ERROR, ELSE SEND REQUEST */
  const onClickHandler = (event) => {
    let friendNameTrim = friendName.trim().toLowerCase();
    const requestId = v4();
    const sendData = {
      username: username,
      friend: friendNameTrim,
      type: "friend",
      lastname: lastName,
      firstname: firstName,
      profileimg: profile_img,
      isFriendRequest: true,
      requestId: requestId,
    };
    const bool = friendNames.some((friend) => friend === friendNameTrim);
    if (!bool) {
      socket.emit("add friend", sendData, (message) => {
        if (message === "OK") {
          toast.dark(`Friend request sent to ${sendData.friend}!`, {
            transition: Flip,
          });
        } else {
          toast.error(message, {
            position: "top-center",
          });
        }
      });
    } else {
      toast.error("Already friends!", {
        position: "top-center",
      });
    }
  };

  /* CREATE A FRIEND LIST TO RENDER, USING FRIEND CARD COMPONENT, ELSE RENDER NO REQUESTS */
  let friendList = [];
  if (friends.length > 0) {
    friendList = friends.map((friend, index) => (
      <FriendCard key={index} friend={friend} />
    ));
  } else {
    friendList = (
      <Typography className={classesRequest.noRequests}>
        No Friends? Get One!
      </Typography>
    );
  }

  return (
    <Box component="div" className={classes.container}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Add friend..."
          onChange={onChangeHandler}
          value={friendName}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
      <div className={classes.clickAdd}>
        <Button
          variant="contained"
          color="primary"
          onClick={onClickHandler}
          disabled={friendName ? false : true}
        >
          Add Friend
        </Button>
      </div>

      {/* FRIENDLIST */}
      <div className={classes.friendList}>{friendList}</div>
    </Box>
  );
}

export default FriendList;
