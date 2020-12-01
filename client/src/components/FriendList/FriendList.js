import React, { useEffect, useState } from 'react';
import { Badge, Box, Typography } from "@material-ui/core";
import { socket } from "../Utilities/API";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, removeFriend, setFriends } from "../../actions/MyFriendsActions";

import Button from "@material-ui/core/Button";
import Face from "@material-ui/icons/Face";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { toast, Flip } from "react-toastify";
import { useStyles } from "./FriendStyles";
import { useStyles as useStylesRequest } from "../Requests/RequestStyles";

import FriendCard from "./FriendCard";

function FriendList() {
    const classes = useStyles();
    const classesRequest = useStylesRequest();

    const dispatch = useDispatch();
    const friends = useSelector((state) => state.MyFriendsReducer.friends);
    const [friendName, setFriendName] = useState("");

    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user.username;

    useEffect(() => {
      let unmounted = false;

      socket.emit("get friends", username, (friends) => {
        console.log(friends);
        if (!unmounted) {
          dispatch(setFriends(friends));
        }
      });
  
      return () => { unmounted = true };
    }, [username, dispatch]);

    const onChangeHandler = (event) => {
      let name = (event.target.value).trim();
      if (name === "") return;
      setFriendName(name);
    }

    const onClickHandler = (event) => {
      const sendData = {
        username: username,
        friend: friendName,
        isFriendRequest: true
      }

      socket.emit("add friend", sendData, (message) => {
        console.log(message);
        if (message.includes("OK")) {
          toast.dark(`Friend request sent to ${sendData.friend}!`, {
            toastId: sendData.friend,
            transition: Flip,
          });
        }
        else {
          toast.error(message, {
            position: "top-center",
          });
        }
      });
    }

  /* CREATE A FRIEND LIST TO RENDER, USING FRIEND CARD COMPONENT, ELSE RENDER NO REQUESTS */
  let friendList = [];
  if (friends.length > 0) {
    friendList = friends.map((friend, index) => (
      <FriendCard 
        key={index}
        data={friend}
      />
    ));
  }
  else {
      friendList = <Typography className={classesRequest.noRequests}>No Friends? Get One!</Typography>;
  }

  return (
    <Box component="div" className={classesRequest.requestsContainer}>
      {/* HEADER FOR FRIENDS */}
      <div className={classesRequest.requestIconContainer}>
        <Badge
          badgeContent={"xxx"}
          className={classesRequest.badge}
          color="error"
        >
          <Typography variant="h5">My Friends</Typography>
          <Face />
        </Badge>
      </div>

      <div className={classesRequest.friendList}>{friendList}</div>
      
      {/* Add a new friend */}
      <div className={classes.addFriendSection}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Add a new Friend!"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={onChangeHandler}
          />
        </div>
        <div className={classes.clickAdd}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={onClickHandler}
            disabled={friendName === ""}
          >
            Add Friend
          </Button>
        </div>
      </div>
    </Box>
  );
}

export default FriendList;