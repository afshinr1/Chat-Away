import { Box, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CreateRoom from "./CreateRoom";
import { AddRoomButton, StyledBadge, useStyles } from "./RoomsStyles";
import HomeIcon from "@material-ui/icons/Home";

import { socket } from "../Utilities/API";
import AllRooms from "./MyRooms";
import RoomCard from "./RoomCard";
function Rooms() {
  const classes = useStyles();
  const [roomList, setRoomList] = useState([]);
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;

  /* Modals */
  const [createRoomModal, setCreateRoomModal] = useState(false);
  const [roomListModal, setRoomListModal] = useState(false);

  /* Display only the first three rooms which the user has joined */
  const currentRooms = roomList.map((room, index) => {
    if (index < 3) {
      return <RoomCard key={index} room={room} />;
    }
    return null;
  });

  /* Get the rooms that the user has joined from DB */
  useEffect(() => {
    let unmounted = false;

    socket.emit("get myRooms", username);

    //Get response
    socket.on("my rooms data", (roomData) => {
      //  console.log(roomData);
      if (!unmounted) {
        setRoomList([...roomData]);
      }
    });

    return () => { unmounted = true };

  }, [username]);

  /* Handle closing the modals */
  const handleModalClose = () => {
    setCreateRoomModal(false);
    setRoomListModal(false);
  };

  return (
    <Box component="div" className={classes.box}>
      {/* Home logo and Home text */}
      <Box component="div" className={classes.heading}>
        <HomeIcon className={classes.homeIcon} />
        <Typography display="block" variant="h6" noWrap>
          Rooms
        </Typography>
      </Box>

      {/* List current rooms of user */}
      <Box component="div" className={classes.userRooms}>
        {currentRooms}
        <Button
          variant="outlined"
          color="primary"
          className={classes.viewbtn}
          onClick={(e) => setRoomListModal(true)}
        >
          View Joined Rooms
        </Button>
        <AllRooms
          roomList={roomList}
          openRoomModal={roomListModal}
          handleModalClose={handleModalClose}
        />
      </Box>

      {/* Create a new Room*/}
      <Box component="div" textAlign="center" marginTop={5}>
        <StyledBadge badgeContent={"+"}>
          <AddRoomButton onClick={(e) => setCreateRoomModal(true)}>
            Create new room
          </AddRoomButton>
        </StyledBadge>

        <CreateRoom
          setRoomList={setRoomList}
          openRoomModal={createRoomModal}
          handleModalClose={handleModalClose}
        />
      </Box>
    </Box>
  );
}

export default Rooms;
