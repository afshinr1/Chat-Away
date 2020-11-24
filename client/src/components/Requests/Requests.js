import { Badge, Box, Typography } from "@material-ui/core";
import React from "react";
import { socket } from "../Utilities/API";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector, useDispatch } from "react-redux";
import { removeRequest } from "../../actions/RequestsActions";
import RoomRequestCard from "./RoomRequestCard";
import { toast } from "react-toastify";
import { useStyles } from "./RequestStyles";
import { addRoom } from "../../actions/MyRoomsActions";

/* COLUMN 1 OF MAIN PAGE. RENDER ALL REQUESTS FROM OTHER PEOPLE */
function Requests() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.RequestsReducer.requests);
  const myRooms = useSelector((state) => state.MyRoomsReducer.roomList);
  const myRoomNames = myRooms.map((room) => room.roomName);
  const requestsNum = requests.length;

  /*  HANDLE ADDING ROOM FOR THE USER */
  const handleAdd = (data) => {
    const { user, roomObj, requestId } = data;
    const { roomName, uuid } = roomObj;

    const obj = { room_uuid: uuid, username: user };
    const bool = myRoomNames.some((name) => name === roomName);
    /*  IF REQUESTED ROOM IS ALREADY JOINED( IN MYROOMS ), SHOW ERROR */
    if (bool) {
      toast.error("Room already joined!", {
        position: "top-center",
      });
    } else {
      /*  ADD ROOM TO USERS ROOMS IN DATABASE THROUGH SERVER */
      socket.emit("join room", obj);
      dispatch(addRoom(roomObj));
      toast.success("Joined Successfully", {
        position: "top-center",
        autoClose: 5000,
        draggable: true,
      });
    }

    /* REMOVE REQUEST CARD */
    dispatch(removeRequest(requestId));
  };

  /* HANDLE REMOVING NOTIFICATION FROM NOTIFICATION LIST */
  const handleCancel = (requestId) => {
    dispatch(removeRequest(requestId));
    toast.info("Removed Notification", {
      position: "top-center",
    });
  };

  /* CREATE A REQUEST LIST TO RENDER, USING REQUEST CARD COMPONENT, ELSE RENDER NO REQUESTS */
  let requestList;
  if (requests.length > 0) {
    requestList = requests.map((request, index) => {
      if (request.type === "room") {
        return (
          <RoomRequestCard
            key={index}
            data={request}
            handleAdd={handleAdd}
            handleCancel={handleCancel}
          />
        );
      } else return <h1>friend request card</h1>;
    });
  } else {
    requestList = (
      <Typography className={classes.noRequests}>No Requests!</Typography>
    );
  }

  return (
    <Box component="div" className={classes.requestsContainer}>
      {/* HEADER FOR REQUESTS */}
      <div className={classes.requestIconContainer}>
        <Badge
          badgeContent={requestsNum}
          className={classes.badge}
          color="error"
        >
          <Typography variant="h5">Requests</Typography>
          <MailIcon />
        </Badge>
      </div>

      {/* RENDER REQUEST LIST */}
      <div className={classes.requestList}>{requestList}</div>
    </Box>
  );
}

export default Requests;
