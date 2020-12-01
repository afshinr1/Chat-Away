import { Box, InputBase } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../Utilities/API";
import PublicRoomCard from "./PublicRoomCard";
import { useStyles } from "./PublicRoomStyles";
import { useDispatch } from "react-redux";
import { addRoom } from "../../../actions/MyRoomsActions";
import { toast } from "react-toastify";
import SearchIcon from "@material-ui/icons/Search";

const PublicRooms = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [publicRooms, setPublicRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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
    socket.emit("get public rooms", (data) => {
      if (!unmounted) {
        setPublicRooms(data);
      }
    });

    return () => {
      unmounted = true;
    };
  }, []);
  /* Search algorithm */
  const dynamicSearch = () => {
    return publicRooms.filter((room) =>
      room.roomName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  
  const list = dynamicSearch().map((room, index) => {
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
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          onChange={editSearchTerm}
          value={searchTerm}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
      {list}
    </Box>
  );
};

export default PublicRooms;
