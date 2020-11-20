import { Box, IconButton, Typography } from "@material-ui/core";
import React, { useState } from "react";
import AddUserModal from "./AddUser/AddUserModal";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import {useStyles} from './Styles'

/* COMPONENT FOR CONTAINER OF ADD USER AND KICK USER */
function Miscellaneous({ onlineUsers, roomObj}) {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const classes = useStyles();

  /* OPEN ADD USER MODAL */
  const handleAddOpen = (e) => {
    setOpenAddUserModal(true);
  };

    /* CLOSE ADD USER MODAL */
  const handleModalClose = (e) => {
    setOpenAddUserModal(false);
  };
  return (
    <Box component='div' className={classes.misc_container}>
      <IconButton size='medium' className={classes.addBtn} color="primary" onClick={handleAddOpen}>
        <Typography variant='body2' >Invite</Typography>
        <GroupAddIcon className={classes.addIcon} />
      </IconButton>

      {/* TODO */}
      <IconButton size='medium' className={classes.addBtn} color="secondary" >
        <Typography variant='body2' >Kick</Typography>
        <RemoveCircleIcon className={classes.addIcon} />
      </IconButton>

      <AddUserModal
        handleModalClose={handleModalClose}
        openAddUserModal={openAddUserModal}
        roomObj = {roomObj}
      />
    </Box>
  );
}

export default Miscellaneous;
