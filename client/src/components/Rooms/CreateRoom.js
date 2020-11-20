import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  Typography,
  Backdrop,
  Fade,
  IconButton,
} from "@material-ui/core";
import { toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles, getModalStyle } from "./RoomsStyles";
import React, { useEffect, useState } from "react";
import { CssTextField } from "./RoomsStyles";
import { socket } from "../Utilities/API";
import { useDispatch } from "react-redux";
import { addRoom } from "../../actions/MyRoomsActions";

/* CREATE ROOM MODAL */
function CreateRoom({ openRoomModal, handleModalClose, setRoomList }) {
  const dispatch = useDispatch();
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [modalStyle] = React.useState(getModalStyle);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState(null);

  const classes = useStyles();

  /* EMIT EVENT TO SERVER TO CREATE A ROOM WITH ROOM NAME,ROOM TYPE AND USERNAME */
  const handleAddRoom = (e) => {
    e.preventDefault();
    socket.emit("create room", { roomName, roomType, username });
    setRoomName("");
    setRoomType(null);
  };

  useEffect(() => {
    /* GET RESPONSE TO CREATE ROOM FROM SERVER */
    socket.on("create room response", (response) => {
      const { newRoom, message } = response;

      /* IF ROOM NAME ALREADY EXISTS, SHOW ERROR*/

      if (message.includes("exists")) {
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          draggable: true,
        });
      } else {
        /* ELSE AUTOMATICALLY JOIN AND ADD ROOM TO MYROOMS STATE*/
        dispatch(addRoom(newRoom));
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          draggable: true,
        });
      }
    });
  }, [setRoomList, dispatch]);
  return (

    /* MAIN MODAL */
    <Modal
      closeAfterTransition
      open={openRoomModal}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openRoomModal}>
        <div style={modalStyle} className={classes.modalBox}>
          <form className={classes.form}>
            <IconButton
              className={classes.closeIcon}
              onClick={handleModalClose}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" gutterBottom className={classes.white}>
              New Room
            </Typography>
            <CssTextField
              label="Room Name"
              type="text"
              onChange={(e) => setRoomName(e.target.value)}
              value={roomName}
              required
            />

            <FormControl
              component="fieldset"
              className={classes.m4}
              margin="normal"
            >
              <FormLabel component="legend" required className={classes.white}>
                Type
              </FormLabel>
              <RadioGroup
                row
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
              >
                <FormControlLabel
                  value="public"
                  control={<Radio color="secondary" />}
                  label="Public"
                  labelPlacement="start"
                />
                <FormControlLabel
                  value="private"
                  control={<Radio color="secondary" />}
                  label="Private"
                  labelPlacement="start"
                />
              </RadioGroup>
            </FormControl>

            <Button
              color="secondary"
              variant="contained"
              disabled={roomType && roomName ? false : true}
              type="submit"
              onClick={handleAddRoom}
            >
              Submit
            </Button>
          </form>
        </div>
      </Fade>
    </Modal>
  );
}

export default CreateRoom;
