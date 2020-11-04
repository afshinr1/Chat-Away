import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import Rooms from "../Rooms/Rooms";
import { useStyles } from "./HomeStyles";
function Home() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Box component="div" width="fullWidth" className={classes.outerContainer}>
      {/*Navbar component */}
      <Navbar />

      <Grid container className={classes.innerContainer}>
       
        {/*Leftmost component, FriendList, notifications etc...*/}
        <Grid item xs={12} md={3} style={{ border: "1px solid red" }}></Grid>

        {/*Room list, add a new room */}
        <Grid item xs={12} md={3}>
          <Rooms />
        </Grid>

        {/*Logo, Meet someone new */}
        <Grid item xs={12} md={3} style={{ border: "2px solid blue" }}></Grid>

        {/*People or something? Public rooms */}
        <Grid item xs={12} md={3} style={{ border: "2px solid green" }}></Grid>
      </Grid>
    </Box>
  );
}

export default Home;
