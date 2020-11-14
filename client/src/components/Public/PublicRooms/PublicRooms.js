import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../Utilities/API";
import PublicRoomCard from "./PublicRoomCard";
import { useStyles } from "./PublicRoomStyles";
import { useDispatch } from "react-redux";
import { addRoom } from "../../../actions/MyRoomsActions";
import { toast } from "react-toastify";

const PublicRooms = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [publicRooms, setPublicRooms] = useState([]);
  const myRooms = useSelector((state) => state.MyRoomsReducer.roomList);
  const myRoomNames = myRooms.map((room) => room.roomName);
  const username = JSON.parse(sessionStorage.getItem("user")).username;

  const handleError = (e) => {
    toast.error("Already Joined");
  };

  const handleJoinRoom = (room) => {
    const obj = { room_uuid: room.uuid, username: username };
    socket.emit("join room", obj);
    dispatch(addRoom(room));
    toast.success("Successfully Joined", {
      position: "top-center",
      autoClose: 5000,
      draggable: true,
    });
  };

  useEffect(() => {
    let unmounted = false;
    socket.emit("get public rooms");

    socket.on("public room data", (data) => {
      console.log(data);
      if (!unmounted) {
        setPublicRooms(data);
      }
    });
    return () => {
      unmounted = true;
    };
  }, []);

  const list = publicRooms.map((room, index) => {
    if (myRoomNames.includes(room.roomName)) {
      return (
        <PublicRoomCard
          key={index}
          room={room}
          handleError={handleError}
          exists={true}
        />
      );
    } else
      return (
        <PublicRoomCard
          key={index}
          room={room}
          handleError={handleError}
          handleJoinRoom={handleJoinRoom}
          exists={false}
        />
      );
  });

  return (
    <Box component="div" className={classes.container}>
      {list}
    </Box>
  );
};

export default PublicRooms;
