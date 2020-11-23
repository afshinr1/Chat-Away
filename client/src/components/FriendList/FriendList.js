import React, { useEffect, useState } from 'react';
import { Badge, Box, Typography } from "@material-ui/core";
import { socket } from "../Utilities/API";
import { useSelector, useDispatch } from "react-redux";
import { addFriend, removeFriend, setFriends } from "../../actions/MyFriendsActions";

import Face from "@material-ui/icons/Face";
import { toast } from "react-toastify";
import { useStyles } from "../Requests/RequestStyles";

import FriendCard from "./FriendCard";

function FriendList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const myFriends = useSelector((state) => state.MyFriendsReducer.friendList);

    const user = JSON.parse(sessionStorage.getItem("user"));
    const username = user.username;

    useEffect(() => {
        let unmounted = false;

        socket.emit("get myFriends", username);
    
        //Get response
        socket.on("my friends data", (data) => {
            console.log(data);
            if (!unmounted) {
                dispatch(setFriends(data));
                setFriends([...data]);
            }
        });
    
        return () => { unmounted = true };
    }, [username, dispatch]);

    /* CREATE A FRIEND LIST TO RENDER, USING FRIEND CARD COMPONENT, ELSE RENDER NO REQUESTS */
    let friendList = [];
    if (myFriends.length > 0) {
        friendList = myFriends.map((friend, index) => (
            <FriendCard 
                key={index}
                data={friend}
            />
        ));
    }
    else {
        friendList = <Typography className={classes.noRequests}>No Friends? Get One!</Typography>;
    }

  return (
    <Box component="div" className={classes.requestsContainer}>
      {/* HEADER FOR FRIENDS */}
      <div className={classes.requestIconContainer}>
        <Badge
          badgeContent={"xxx"}
          className={classes.badge}
          color="error"
        >
          <Typography variant="h5">My Friends</Typography>
          <Face />
        </Badge>
      </div>

      <div className={classes.friendList}>{friendList}</div>
    </Box>
  );
}

export default FriendList;