import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Public from "../Public/Public";
import Meet from "../Meet/Meet";
import Navbar from "../Navbar/Navbar";
import Rooms from "../Rooms/Rooms";
import { useStyles } from "./HomeStyles";

import { socket } from "../Utilities/API";
import Requests from "../Requests/Requests";
import { useDispatch } from "react-redux";
import { Flip, toast } from "react-toastify";
import { addRequest } from "../../actions/RequestsActions";
import { addFriend } from "../../actions/MyFriendsActions";

/* MAIN PAGE. RENDER ALL 4 COLUMNS */

function Home() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const username = JSON.parse(sessionStorage.getItem("user")).username;

  useEffect(() => {
    /* ON FIRST JOINING THE APPLICATION, TELL SERVER USER HAS CONNECTED AND SAVE USERNAME DATA */
    console.log("Connected");
    socket.emit("connection", username);
  }, [username]);

  useEffect(() => {
    /* ON A NEW ROOM REQUEST, ADD REQUEST TO REQUEST LIST */
    socket.on("room request", (obj) => {
      toast.dark("New notification request!", {
        toastId: obj.requestId,
        transition: Flip,
      });
      dispatch(addRequest(obj));
    });

  
    /* ON A FRIEND REQUEST BEING RECEIVED, ADD FRIEND REQUEST TO REQUEST LIST */
    socket.on("friend request", (obj) => {
     // console.log(obj);
      const { username } = obj;
      toast.dark("New friend request from " + username, {
        toastId: obj.requestId,
        transition: Flip,
      });
      obj.user = username;

      dispatch(addRequest(obj));
    });

    /* ON A CHAT REQUEST BEING RECEIVED, ADD Chat REQUEST TO REQUEST LIST */
    socket.on("chat request", (obj) => {
      // console.log(obj);
      const { username } = obj;
      toast.dark("New chat request from " + username, {
        toastId: obj.requestId,
        transition: Flip,
      });

      dispatch(addRequest(obj));
    });

    /* NOT USED CURRENTLY */
    /* ON A FRIEND REQUEST BEING ACCEPTED, ADD FRIEND TO FRIEND LIST */
    socket.on("friend request accepted", (friend) => {
      toast.dark(`${friend.username} accepted your friend request!`, {
        toastId: friend.username,
        transition: Flip,
      });
      dispatch(addFriend(friend));
    });
  }, [dispatch]);

  return (
    <Box component="div" width="fullWidth" className={classes.outerContainer}>
      {/*Navbar component */}
      <Navbar />

      <Grid container className={classes.innerContainer}>
        {/* COL 1 : Leftmost component, FriendList, notifications etc...*/}
        <Grid item xs={12} md={3} className={classes.col1}>
          <Requests />
        </Grid>

        {/*COL 2 : Room list, add a new room */}
        <Grid item xs={12} md={3} className={classes.col2}>
          <Rooms />
        </Grid>

        {/* COL 3 : Logo, Meet someone new */}
        <Grid item xs={12} md={3} className={classes.col3}>
          <Meet />
        </Grid>

        {/* COL 4: People or something? Public rooms */}
        <Grid item xs={12} md={3} className={classes.col4}>
          <Public />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
