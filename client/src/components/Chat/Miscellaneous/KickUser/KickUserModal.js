import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { toast } from "react-toastify";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { useStyles, getModalStyle, AddUserTextField } from "./KickUserStyles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { socket } from "../../../Utilities/API";

/* INVITE USER TO A ROOM MODAL COMPONENT */
function KickUserModal({ openKickUserModal, handleModalClose, roomObj }) {
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [modalStyle] = React.useState(getModalStyle);
  const [input, setInput] = useState("");

  const classes = useStyles();

  /* SUBMIT ON ENTER PRESS */
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleKickUser();
    }
  };


  /* HANDLE KICKING USER FROM THE ROOM */
  const handleKickUser = (e) => {
    let newInput = input.trim();
    const msg = { username: newInput, roomObj, requestedBy: username };
    if (newInput) {
      socket.emit("kick user from room", msg, (response) => {
        /* SERVER RESPONSE */

        /* RECIEVE ERROR FROM SERVER IF KICKED USER CURRENTLY IS NOT IN ROOM */
        if (response.includes("error")) {
          toast.warning("User currently not in room!!", {
            position: "top-center",
          });
        }

        /* RECIEVE ERROR FROM SERVER IF KICKED USER IS YOURSELF */
        if (response.includes("same")) {
          toast.info("You cannot kick yourself!", {
            position: "top-center",
          });
        }

        /* RECIEVE SUCCESS MESSAGE FROM SERVER IF KICKED SUCCESSFULLY*/
        if (response.includes("success")) {
          toast.success("Successfully kicked user!", {
            position: "top-center",
          });
        }
      });
    } else {
      toast.warning("Please enter a valid username", {
        position: "top-center",
      });
    }
    setInput("");
  };

  return (
    <Modal
      closeAfterTransition
      onClose={handleModalClose}
      open={openKickUserModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openKickUserModal}>
        <div style={modalStyle} className={classes.modalBox}>
          <Typography>Kick User</Typography>
          <AddUserTextField
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            value={input}
            required
            label="Enter Username"
            type="Text"
          />
          <Button
            className={classes.btn}
            color="secondary"
            onClick={handleKickUser}
            variant="contained"
            startIcon={<RemoveCircleOutlineIcon />}
          >
            Kick
          </Button>

          <IconButton className={classes.closeIcon} onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </Fade>
    </Modal>
  );
}

export default KickUserModal;
