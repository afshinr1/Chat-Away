import { Badge, Box, Typography } from "@material-ui/core";
import React from "react";
import { socket } from "../Utilities/API";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector, useDispatch } from "react-redux";
import { removeRequest } from "../../actions/RequestsActions";
import { addFriend } from "../../actions/MyFriendsActions";
import RequestCard from "./RequestCard";
import { toast } from "react-toastify";
import { useStyles } from "./RequestStyles";
import { addRoom } from "../../actions/MyRoomsActions";
import { history } from "../Utilities/History";

/* COLUMN 1 OF MAIN PAGE. RENDER ALL REQUESTS FROM OTHER PEOPLE */
function Requests() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const requests = useSelector((state) => state.RequestsReducer.requests);
  const friends = useSelector((state) => state.MyFriendsReducer.friends);
  const myRooms = useSelector((state) => state.MyRoomsReducer.roomList);
  const myRoomNames = myRooms.map((room) => room.roomName);
  const requestsNum = requests.length;
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;

  const friendNames = friends.map((friend) => {
    return friend.username === username ? friend.friend : friend.username;
  });

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
      });
    }

    /* REMOVE REQUEST CARD */
    dispatch(removeRequest(requestId));
  };

  /* HANDLE REMOVING NOTIFICATION FROM NOTIFICATION LIST */
  const handleCancel = (data) => {
    dispatch(removeRequest(data.requestId));
    toast.info("Removed Notification", {
      position: "top-center",
    });
  };

  /* TODO: HANDLE ADDING FRIEND TO FRIENDLIST */
  const handleAddFriend = (data) => {
    const sendData = {
      username: username,
      friend: data.user,
    };
    const bool = friendNames.some((friend) => friend === data.user);
    if (!bool) {
      socket.emit("accept friend", sendData, (message) => {
        if (message.includes("OK")) {
          toast.info(`Friend request accepted from ${data.user}!`, {
            position: "top-center",
          });
          dispatch(addFriend(data));
        } else {
          toast.error(message, {
            position: "top-center",
          });
        }
      });
    } else {
      toast.error("Already friends!", {
        position: "top-center",
      });
    }
    dispatch(removeRequest(data.requestId));
  };

  /* HANDLE JOINING A PRIVATE CHAT WITH A FRIEND */
  const handleJoinPrivateRoom = (obj) => {
    const { randomRoom } = obj;
    history.push(
      `/chat/${randomRoom}?name=Private Chat&type=chat&host=Administrator`
    );
    dispatch(removeRequest(obj.requestId));

  };
  /* TODO: HANDLE REMOVING FRIEND REQUEST */
  const handleCancelFriend = (data) => {
    toast.info("Declined Friend Request", {
      position: "top-center",
    });

    dispatch(removeRequest(data.requestId));
  };

  /* CREATE A REQUEST LIST TO RENDER, USING REQUEST CARD COMPONENT, ELSE RENDER NO REQUESTS */
  let requestList = (
    <Typography className={classes.noRequests}>No Requests!</Typography>
  );

  if (requests.length > 0) {
    requestList = requests.map((request, index) => {
      if (request.type === "room") {
        return (
          <RequestCard
            key={index}
            data={request}
            type="room"
            handleAdd={handleAdd}
            handleCancel={handleCancel}
          />
        );
      } else if (request.type === "friend") {
        return (
          <RequestCard
            key={index}
            data={request}
            type="friend"
            handleAdd={handleAddFriend}
            handleCancel={handleCancelFriend}
          />
        );
      } else if (request.type === "chat") {
        return (
          <RequestCard
            key={index}
            data={request}
            type="chat"
            handleAdd={handleJoinPrivateRoom}
            handleCancel={handleCancel}
          />
        );
      }
      return (
        <Typography className={classes.noRequests}>No Requests!</Typography>
      );
    });
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
