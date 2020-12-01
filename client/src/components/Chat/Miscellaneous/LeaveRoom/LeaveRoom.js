import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import Typography from "@material-ui/core/Typography";
import {
  useStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "./LeaveStyles";
import { socket } from "../../../Utilities/API";
import { toast, Slide } from "react-toastify";
import { history } from "../../../Utilities/History";

export default function LeaveRoom({
  leaveDialogOpen,
  handleModalClose,
  roomObj,
  username,
}) {
  const classes = useStyles();

  const handleLeaveRoom = (e) => {
    const msg = { room_uuid: roomObj.uuid, username: username };

    socket.emit("withdraw room", msg, (response) => {
      /* Response from server */
      history.goBack();
      toast.success(response, {
        transition: Slide,
        position: "top-center",
      });
    });
  };

  return (
    <div>
      <Dialog
        className={classes.container}
        onClose={handleModalClose}
        open={leaveDialogOpen}
      >
        <DialogTitle className={classes.title} onClose={handleModalClose}>
          <Typography className={classes.white}>LEAVE ROOM</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Typography className={classes.white} gutterBottom>
            By leaving this room, you consent that you may require an invite to
            join the room again. Click Leave if you wish to still proceed.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            autoFocus
            className={classes.leaveBtn}
            variant="contained"
            onClick={handleLeaveRoom}
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
