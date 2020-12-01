import {
  Modal,
  Backdrop,
  Fade,
  Typography,
  IconButton,
  Avatar,
} from "@material-ui/core";
import { useStyles, getModalStyle } from "./OnlineUsersStyles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";

/* DISPLAY ALL ONLINE USERS IN ROOM. USED FOR MOBILE VIEW */
function AddUserModal({ onlineUsersOpen, handleModalClose, onlineUsers }) {
  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [modalStyle] = React.useState(getModalStyle);

  const classes = useStyles();

  const roomUsers = onlineUsers.map(user => (
    user.username === username ? (
        /* STYLES aPPLIED IF THIS USERNAME IS YOUR USERNAME */
        <div key={user.id} className='user-container'>
          <Avatar src={user.profile_img} alt='' className='user-avatar' />
        <Typography variant="h6" className='current-user' color="secondary" >
          {user.username}
        </Typography>
        </div>
      ) : (
        <div key={user.id} className='user-container'>
          <Avatar src={user.profile_img} alt='' className='user-avatar' />
        <Typography variant="body1" >
          {user.username}
        </Typography>
        </div>
      )
  ))

  return (
    <Modal
      closeAfterTransition
      onClose={handleModalClose}
      open={onlineUsersOpen}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={onlineUsersOpen}>
        <div style={modalStyle} className={classes.modalBox}>
          <IconButton className={classes.closeIcon} onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
          <Typography className={classes.header}>Online Users</Typography>
          {roomUsers}
        </div>
      </Fade>
    </Modal>
  );
}

export default AddUserModal;
