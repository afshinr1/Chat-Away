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
import ErrorIcon from "@material-ui/icons/Error";
import OnlineUsersModal from "./OnlineUsers/OnlineUsersModal";
import DeleteRoomModal from "./Miscellaneous/DeleteRoom/DeleteRoomModal";
export default function MobileView({ roomObj, host, onlineUsers, type }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;
  const admin = user.role === "Admin" ? true : false;
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [openKickUserModal, setOpenKickUserModal] = useState(false);
  const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [onlineUsersOpen, setonlineUsersOpen] = useState(false);
  /* OPEN ADD USER MODAL */
  const handleAddOpen = (e) => {
    setOpenAddUserModal(true);
  };

  const handleOnlineUsersOpen = (e) => {
    setonlineUsersOpen(true);
  };

  /* OPEN KICK USER MODAL */
  const handleKickOpen = (e) => {
    setOpenKickUserModal(true);
  };

  /* OPEN DELETE ROOM MODAL (ONLY FOR ADMINS) */
  const handleDeleteOpen = (e) => {
    setDeleteDialogOpen(true);
  };

  /* CLOSE ALL MODALS */
  const handleModalClose = (e) => {
    setOpenAddUserModal(false);
    setOpenKickUserModal(false);
    setLeaveDialogOpen(false);
    setDeleteDialogOpen(false);
    setonlineUsersOpen(false);
  };

  const toggleDrawer = (bool) => (event) => {
    setOpen(bool);
  };

  const actionButton =
    user.role === "Admin" ? (
      <List className={classes.lastElement}>
        <ListItem
          button
          disabled={type === "chat" ? true : false}
          onClick={handleDeleteOpen}
        >
          <ListItemIcon>
            <ErrorIcon className={classes.red} />
          </ListItemIcon>
          <ListItemText primary="Delete Room" />
        </ListItem>
      </List>
    ) : (
      <List className={classes.lastElement}>
        <ListItem
          button
          disabled={type === "chat" ? true : false}
          onClick={(e) => setLeaveDialogOpen(true)}
        >
          <ListItemIcon>
            <WarningIcon className={classes.red} />
          </ListItemIcon>
          <ListItemText primary="Leave Room" />
        </ListItem>
      </List>
    );

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
            <ListItem
              button
              disabled={type === "chat" ? true : false}
              className={classes.blue}
              onClick={handleAddOpen}
            >
              <ListItemIcon>
                <GroupAddIcon className={classes.blue} />
              </ListItemIcon>
              <ListItemText primary="Add User" />
            </ListItem>

            <ListItem
              button
              disabled={username === host || admin ? false : true}
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
            <ListItem
              button
              onClick={handleOnlineUsersOpen}
              className={classes.green}
            >
              <ListItemIcon>
                <EmojiPeopleIcon className={classes.green} />
              </ListItemIcon>
              <ListItemText primary="Online Users" />
            </ListItem>
          </List>
        </div>

        <Divider className={classes.divider} />
        {actionButton}
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
        onlineUsers = {onlineUsers}
      />

      <DeleteRoomModal
        handleModalClose={handleModalClose}
        roomObj={roomObj}
        username={username}
        deleteDialogOpen={deleteDialogOpen}
      />

      <OnlineUsersModal
        onlineUsersOpen={onlineUsersOpen}
        handleModalClose={handleModalClose}
        onlineUsers={onlineUsers}
      />
    </div>
  );
}
