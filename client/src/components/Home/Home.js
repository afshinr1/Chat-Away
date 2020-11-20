import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Public from "../Public/Public";
import Meet from "../Meet/Meet";
import Navbar from "../Navbar/Navbar";
import Rooms from "../Rooms/Rooms";
import { useStyles } from "./HomeStyles";
import { socket } from "../Utilities/API";
import Requests from "../Requests/Requests";

/* MAIN PAGE. RENDER ALL 4 COLUMNS */

function Home() {
  const classes = useStyles();
  const username = JSON.parse(sessionStorage.getItem("user")).username;

  useEffect(() => {
    /* ON FIRST JOINING THE APPLICATION, TELL SERVER USER HAS CONNECTED AND SAVE USERNAME DATA */
    console.log("Connected");
    socket.emit("connection", username);
  }, [username]);

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
