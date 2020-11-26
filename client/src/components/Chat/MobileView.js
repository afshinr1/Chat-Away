import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import MenuIcon from "@material-ui/icons/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import WarningIcon from "@material-ui/icons/Warning";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import { useStyles } from "./ChatStyles";
import { IconButton } from "@material-ui/core";
import AddUserModal from "./Miscellaneous/AddUser/AddUserModal";
import LeaveRoom from "./Miscellaneous/LeaveRoom/LeaveRoom";
import KickUserModal from "./Miscellaneous/KickUser/KickUserModal";
export default function MobileView({ roomObj, host }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const username = JSON.parse(sessionStorage.getItem("user")).username;
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openKickUserModal, setOpenKickUserModal] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

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

  const toggleDrawer = (bool) => (event) => {
    setOpen(bool);
  };

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={toggleDrawer(false)}
        className={classes.drawerContainer}
        onOpen={toggleDrawer(true)}
      >
        <div className={classes.list}>
          <List>
            <ListItem button className={classes.blue} onClick={handleAddOpen}>
              <ListItemIcon>
                <GroupAddIcon className={classes.blue} />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItem>

            <ListItem
              button
              disabled={username === host ? false : true}
              className={classes.pink}
              onClick={handleKickOpen}
            >
              <ListItemIcon>
                <RemoveCircleIcon className={classes.pink} />
              </ListItemIcon>
              <ListItemText primary="Kick User" />
            </ListItem>
          </List>
          <Divider className={classes.divider} />

          <List>
            <ListItem button className={classes.green}>
              <ListItemIcon>
                <EmojiPeopleIcon className={classes.green} />
              </ListItemIcon>
              <ListItemText primary="Online Users" />
            </ListItem>
          </List>
        </div>

        <Divider className={classes.divider} />
        <List className={classes.lastElement}>
          <ListItem button onClick={(e) => setLeaveDialogOpen(true)}>
            <ListItemIcon>
              <WarningIcon className={classes.red} />
            </ListItemIcon>
            <ListItemText primary="Leave Room" />
          </ListItem>
        </List>
      </SwipeableDrawer>

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
    </div>
  );
}
