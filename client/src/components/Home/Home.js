import { Box, Grid } from "@material-ui/core";
import React, { useEffect } from "react";
import Public from "../Public/Public";
import Meet from "../Meet/Meet";
import Navbar from "../Navbar/Navbar";
import Rooms from "../Rooms/Rooms";
import { useStyles } from "./HomeStyles";

/* MAIN PAGE. RENDER ALL 4 COLUMNS */

function Home() {
  const classes = useStyles();

  useEffect(() => {}, []);

  return (
    <Box component="div" width="fullWidth" className={classes.outerContainer}>
      {/*Navbar component */}
      <Navbar />

      <Grid container className={classes.innerContainer}>
        {/* COL 1 : Leftmost component, FriendList, notifications etc...*/}
        <Grid item xs={12} md={3} style={{ border: "1px solid red" }}></Grid>

        {/*COL 2 : Room list, add a new room */}
        <Grid item xs={12} md={3} style={{ border: "1px solid blue" }}>
          <Rooms />
        </Grid>

        {/* COL 3 : Logo, Meet someone new */}
        <Grid item xs={12} md={3} className={classes.col3}>
          <Meet />
        </Grid>

        {/* COL 4: People or something? Public rooms */}
        <Grid item xs={12} md={3} style={{ border: "2px solid green" }}>
          <Public />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
