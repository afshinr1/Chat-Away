import {
  Backdrop,
  Fade,
  IconButton,
  Modal,
  Typography,
} from "@material-ui/core";
import React from "react";
import CloseIcon from "@material-ui/icons/Close";
import { useStyles, getModalStyle } from "./RoomsStyles";
import RoomCard from "./RoomCard";

function AllRooms({ openRoomModal, handleModalClose, roomList }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  let currentRooms;

  /* Map all current rooms with Roomcard  */
  currentRooms = roomList.map((room) => {
    return <RoomCard room={room} />;
  });

  /* Render My Rooms Modal */
  return (
    <Modal
      closeAfterTransition
      open={openRoomModal}
      onClose={handleModalClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openRoomModal}>
        <div style={modalStyle} className={classes.modalBox}>
          <IconButton className={classes.closeIcon} onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>

          <Typography variant="h4" gutterBottom>
            My Rooms
          </Typography>

          {currentRooms}
        </div>
      </Fade>
    </Modal>
  );
}

export default AllRooms;
