import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Public from "../Public/Public";
import Meet from "../Meet/Meet";
import Navbar from "../Navbar/Navbar";
import Rooms from "../Rooms/Rooms";
import { useStyles } from "./HomeStyles";
import { socket } from "../Utilities/API";
import Requests from "../Requests/Requests";
import FriendList from "../FriendList/FriendList";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

/* MAIN PAGE. RENDER ALL 4 COLUMNS */

function Home() {
  const classes = useStyles();
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [showFriends, setShowFriends] = useState(true);
  
  useEffect(() => {
    /* ON FIRST JOINING THE APPLICATION, TELL SERVER USER HAS CONNECTED AND SAVE USERNAME DATA */
    console.log("Connected");
    socket.emit("connection", username);
  }, [username]);

  const handleChange = (event, value) => {
    setShowFriends(value == 0);
  }

  const toggleTabs = (
    <Tabs value={ showFriends ? 0 : 1 } onChange={handleChange} >
      <Tab label="Friends" />
      <Tab label="Requests" />
    </Tabs>
  );

  return (
    <Box component="div" width="fullWidth" className={classes.outerContainer}>
      {/*Navbar component */}
      <Navbar />

      <Grid container className={classes.innerContainer}>
        {/* COL 1 : Leftmost component, FriendList, notifications etc...*/}
        <Grid item xs={12} md={3} className={classes.col1}>
          { toggleTabs }
          { showFriends ? <FriendList/> : <Requests />}
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