import { Badge, Box, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { socket } from "../Utilities/API";
import MailIcon from "@material-ui/icons/Mail";
import { useSelector, useDispatch } from "react-redux";
import { setRequests, addRequest, removeRequest } from "../../actions/RequestsActions";
import { addFriend, removeFriend, setFriends } from "../../actions/MyFriendsActions";
import RequestCard from "./RequestCard";
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
  const user = JSON.parse(sessionStorage.getItem("user"));
  const username = user.username;

  useEffect(() => {
    let unmounted = false;

    socket.emit("get requests", username, (requests) => {
      console.log(requests);
      if (!unmounted) {
        dispatch(setRequests(requests));
      }
    });

    return () => { unmounted = true };
  }, [username, dispatch]);

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
  const handleCancel = (requestId) => {
    dispatch(removeRequest(requestId));
    toast.info("Removed Notification", {
      position: "top-center",
    });
  };

  /* TODO: HANDLE ADDING FRIEND TO FRIENDLIST */
  const handleAddFriend = (friendName) => {
    const sendData = {
      username: username,
      friend: friendName,
      isFriendRequest: true,
    }
    socket.emit("add friend", sendData, (message) => {
      console.log(message);
      if (message.includes("OK")) {
        toast.dark(`Friend request accepted from ${sendData.friend}!`, {
          toastId: sendData.friend,
          transition: Flip,
        });
        dispatch(addFriend(friendName));
      }
      else {
        toast.error(message, {
          position: "top-center",
        });
      }
    });
  }

  /* TODO: HANDLE REMOVING FRIEND REQUEST */
  const handleCancelFriend = (friendName) => {
    const sendData = {
      username: username,
      friend: friendName,
    }
    socket.emit("remove friend", sendData, (message) => {
      toast.info("Declined Friend Request", {
        position: "top-center",
      });
    });
  }

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
        )
      };
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
