import { Box, Divider } from "@material-ui/core";
import React from "react";
import { MeetButton, useStyles } from "./MeetStyles";
import TextsmsIcon from "@material-ui/icons/Textsms";
import { history } from "../Utilities/History";

/* THIRD COLUMN IN MAIN PAGE. PROFILE BUTTON AND MEET SOMEONE NEW */
function Meet() {
  const classes = useStyles();

  return (
    <Box className={classes.meet_container} component="div">
      <div className={classes.top_half}>
        <input
          type="image"
          alt="logo"
          className={classes.btn_logo}
          onClick={(e) => history.push("/profile")}
          src={`${process.env.PUBLIC_URL}/images/logo.png`}
        />
      </div>
      <Divider className={classes.divider} />
      <div className={classes.bottom_half}>
        <MeetButton className={classes.meet_btn} disableRipple>
          Meet Someone New!
          <TextsmsIcon className={classes.speechIcon} />
        </MeetButton>
      </div>
    </Box>
  );
}

export default Meet;
