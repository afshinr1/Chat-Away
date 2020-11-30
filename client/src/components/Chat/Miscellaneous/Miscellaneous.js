import { Box, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddUserModal from "./AddUser/AddUserModal";
import WarningIcon from "@material-ui/icons/Warning";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { DeleteButton, LeaveButton, useStyles } from "./Styles";
import LeaveRoom from "./LeaveRoom/LeaveRoom";
import KickUserModal from "./KickUser/KickUserModal";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteRoomModal from "./DeleteRoom/DeleteRoomModal";


/* COMPONENT FOR CONTAINER OF ADD USER AND KICK USER */
function Miscellaneous({ onlineUsers, host, roomObj }) {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;
  const admin = user.role === "Admin" ? true : false;

  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openKickUserModal, setOpenKickUserModal] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const classes = useStyles();

  /* OPEN ADD USER MODAL */
  const handleAddOpen = (e) => {
    setOpenAddUserModal(true);
  };
  /* OPEN DELETE ROOM MODAL (ONLY FOR ADMINS) */
  const handleDeleteOpen = (e) => {
    setDeleteDialogOpen(true);
  };

  /* OPEN KICK USER MODAL */
  const handleKickOpen = (e) => {
    setOpenKickUserModal(true);
  };

  /* CLOSE ALL MODALS */
  const handleModalClose = (e) => {
    setOpenAddUserModal(false);
    setOpenKickUserModal(false);
    setDeleteDialogOpen(false);
    setLeaveDialogOpen(false);
  };

  /* IF USER IS AN ADMIN, RENDER DELETE ROOM BUTTON, ELSE RENDER LEAVE ROOM BUTTON */
  const actionButton =
    user.role === "Admin" ? (
      <DeleteButton
        variant="outlined"
        onClick={(e) => handleDeleteOpen()}
        startIcon={<ErrorIcon />}
        className={classes.deleteBtn}
      >
        Delete
      </DeleteButton>
    ) : (
      <LeaveButton
        startIcon={<WarningIcon />}
        onClick={(e) => setLeaveDialogOpen(true)}
        variant="outlined"
      >
        Leave
      </LeaveButton>
    );

  return (
    <Box component="div" className={classes.misc_container}>
      {/* INVITE USER BUTTON */}
      <IconButton
        size="medium"
        className={classes.addBtn}
        color="primary"
        onClick={handleAddOpen}
      >
        <Typography variant="body2">Invite</Typography>
        <GroupAddIcon className={classes.addIcon} />
      </IconButton>

      {/* KICK USER BUTTON */}
      <IconButton
        disabled={username === host || admin ? false : true}
        size="medium"
        onClick={handleKickOpen}
        className={classes.addBtn}
        color="secondary"
      >
        <Typography variant="body2">Kick</Typography>
        <RemoveCircleIcon className={classes.addIcon} />
      </IconButton>

      {/* DELETE ROOM OR LEAVE ROOM, DEPENDS ON IF USER IS ADMIN OR NOT */}
      {actionButton}

      <AddUserModal
        handleModalClose={handleModalClose}
        openAddUserModal={openAddUserModal}
        roomObj={roomObj}
      />

      <LeaveRoom
        leaveDialogOpen={leaveDialogOpen}
        handleModalClose={handleModalClose}
        roomObj={roomObj}
        username={username}
      />

      <KickUserModal
        handleModalClose={handleModalClose}
        openKickUserModal={openKickUserModal}
        roomObj={roomObj}
      />

      <DeleteRoomModal
        handleModalClose={handleModalClose}
        roomObj={roomObj}
        username={username}
        deleteDialogOpen={deleteDialogOpen}
      />
    </Box>
  );
}

export default Miscellaneous;
