import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { toast } from "react-toastify";
import { useStyles, getModalStyle, AddUserTextField } from "./AddUserStyles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { socket } from "../../../Utilities/API";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";

/* INVITE USER TO A ROOM MODAL COMPONENT */
function AddUserModal({ openAddUserModal, handleModalClose, roomObj }) {
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [modalStyle] = React.useState(getModalStyle);
  const [input, setInput] = useState("");

  const classes = useStyles();

  /* SUBMIT ON ENTER PRESS */
  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      handleAddUser();
    }
  };

  /* SEND INVITATION TO USER WITH {user = username}. SEND ROOM DATA TO USER REQUESTED*/
  const handleAddUser = (e) => {
    let newInput = input.trim();
    const requestId = uuidv4();
    const msg = {
      requestId,
      user: newInput,
      roomObj,
      requestedBy: username,
      type: "room",
    };
    if (newInput) {
      socket.emit("add user to room", msg, (response) => {
        /* SERVER RESPONSE */

        /* RECIEVE ERROR FROM SERVER IF INVITED USER CURRENTLY IS NOT ONLINE */
        if (response.includes("error")) {
          toast.warning("User currently not online!", {
            position: "top-center",
          });
        }

        /* RECIEVE ERROR FROM SERVER IF INVITED USER IS YOURSELF */
        if (response.includes("same")) {
          toast.info("You cannot request to add yourself!", {
            position: "top-center",
          });
        }

        /* RECIEVE SUCCESS MESSAGE FROM SERVER IF INVITED WAS INVITED SUCCESSFULLY*/
        if (response.includes("success")) {
          toast.success("Successfully requested user!", {
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
      open={openAddUserModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openAddUserModal}>
        <div style={modalStyle} className={classes.modalBox}>
          <Typography>Add User</Typography>
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
            color="primary"
            onClick={handleAddUser}
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add
          </Button>

          <IconButton className={classes.closeIcon} onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </div>
      </Fade>
    </Modal>
  );
}

export default AddUserModal;
