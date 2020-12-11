import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import { toast, Zoom } from "react-toastify";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import {
  useStyles,
  getModalStyle,
  AddUserTextField,
  StyledAutocomplete,
} from "./KickUserStyles";
import CloseIcon from "@material-ui/icons/Close";
import React, { useState } from "react";
import { socket } from "../../../Utilities/API";
import { v4 } from "uuid";
/* INVITE USER TO A ROOM MODAL COMPONENT */
function KickUserModal({
  openKickUserModal,
  handleModalClose,
  roomObj,
  onlineUsers,
}) {
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [modalStyle] = React.useState(getModalStyle);
  const [input, setInput] = useState("");
  const [value, setValue] = useState(null);
  const options = onlineUsers.map((user) => user.username);

  const classes = useStyles();

  /* HANDLE KICKING USER FROM THE ROOM */
  const handleKickUser = (e) => {
    let newInput = value.trim();
    const id = v4();
    const msg = { id:id, username: newInput, roomObj, requestedBy: username };
    if (newInput) {
      socket.emit("kick user from room", msg, (response) => {
        /* SERVER RESPONSE */

        /* RECIEVE ERROR FROM SERVER IF KICKED USER CURRENTLY IS NOT IN ROOM */
        if (response.includes("error")) {
          toast.warning("User currently not in room!!", {
            position: "top-center",
            transition: Zoom,
          });
        }

        /* RECIEVE ERROR FROM SERVER IF KICKED USER IS YOURSELF */
        if (response.includes("same")) {
          toast.info("You cannot kick yourself!", {
            position: "top-center",
            transition: Zoom,
          });
        }

        /* RECIEVE SUCCESS MESSAGE FROM SERVER IF KICKED SUCCESSFULLY*/
        if (response.includes("success")) {
          toast.success("Successfully kicked user!", {
            position: "top-center",
            transition: Zoom,
          });
        }
      });
    } else {
      toast.warning("Please enter a valid username", {
        position: "top-center",
        transition: Zoom,
      });
    }
    setInput("");
    setValue(null);
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

          {/* AUTOCOMPLETE INPUT TO KICK USER. SELECT FROM AVAILABLE ONLINE USERS */}
          <StyledAutocomplete
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            inputValue={input}
            onInputChange={(event, newInputValue) => {
              setInput(newInputValue);
            }}
            getOptionDisabled={(option) => option === username}
            options={options}
            className={classes.btn}
            renderInput={(params) => (
              <AddUserTextField {...params} label="Select User" />
            )}
          />

          <Button
            className={classes.btn}
            color="secondary"
            onClick={handleKickUser}
            variant="contained"
            disabled={value ? false : true}
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
