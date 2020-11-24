import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { useStyles } from "./NavbarStyles";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import { history } from "../Utilities/History";


/* NAVBAR. NEED TO CHANGE STUFF AS NEEDED */
export default function Navbar() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const classes = useStyles();

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    history.push("/login");
  };

  return (
    <div >
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <img
            className={classes.img_logo}
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="Logo.png"
          />
          <Typography className={classes.title} variant="h6" noWrap>
            Chat Away
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.grow} />

          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
