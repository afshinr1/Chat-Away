import { Box, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddUserModal from "./AddUser/AddUserModal";
import WarningIcon from "@material-ui/icons/Warning";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { LeaveButton, useStyles } from "./Styles";
import LeaveRoom from "./LeaveRoom/LeaveRoom";
import KickUserModal from "./KickUser/KickUserModal";

/* COMPONENT FOR CONTAINER OF ADD USER AND KICK USER */
function Miscellaneous({ onlineUsers, host, roomObj }) {
  const username = JSON.parse(sessionStorage.getItem("user")).username;

  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openKickUserModal, setOpenKickUserModal] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

  const classes = useStyles();

  /* OPEN ADD USER MODAL */
  const handleAddOpen = (e) => {
    setOpenAddUserModal(true);
  };

  /* OPEN KICK USER MODAL */
  const handleKickOpen = (e) => {
    setOpenKickUserModal(true);
  };

  /* CLOSE ALL MODALS */
  const handleModalClose = (e) => {
    setOpenAddUserModal(false);
    setOpenKickUserModal(false);
    setLeaveDialogOpen(false);
  };
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
        disabled={username === host ? false : true}
        size="medium"
        onClick={handleKickOpen}
        className={classes.addBtn}
        color="secondary"
      >
        <Typography variant="body2">Kick</Typography>
        <RemoveCircleIcon className={classes.addIcon} />
      </IconButton>

      <LeaveButton
        startIcon={<WarningIcon />}
        onClick={(e) => setLeaveDialogOpen(true)}
        variant="outlined"
      >
        Leave
      </LeaveButton>

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
    </Box>
  );
}

export default Miscellaneous;
