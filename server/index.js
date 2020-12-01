const bodyParser = require("body-parser");
const {
  addUser,
  removeUser,
  removeUserAll,
  addUserAll,
  getUser,
  getIdByUsername,
  getIdByUsernameRoom,
  getUsersInRoom,
} = require("./utilities/Users");
const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const {
  getUserController,
  setUserProfilePicController,
} = require("./controllers/UserController");
const {
  createRoomController,
  getPublicRoomsController,
  joinRoomController,
  getMyRoomsController,
  leaveRoomController,
} = require("./controllers/RoomController");
const {
  getFriendsController,
  addFriendController,
  removeFriendController,
  getFriendRequestsController,
} = require("./controllers/FriendController");
const { createMessage } = require("./utilities/Messages");
const { create } = require("domain");
const UserController = require("./controllers/UserController");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

/* Using routes for authorization ONLY */
app.use("/", require("./routes"));

/* New User connects to server */
io.on("connection", (socket) => {

  /* Add user to all user list on first connect*/
  socket.on("connection", (username) => {
    console.log("on first connect", username);
    addUserAll(socket.id, username);
  });

  /* HANDLE PROFILE PIC IMAGE UPLOAD */
  socket.on("image upload", (data, callback) => {
    const { username, image } = data;
    const response = setUserProfilePicController(username, image);
    response.then((res) => callback(res));
  });

  /* ROOMS */

  /* Get all rooms for a user */
  socket.on("get myRooms", (username, callback) => {
    console.log("in get rooms for user : " + username);
    let result = getMyRoomsController(username);
    result
      .then((myRooms) => {
        callback(myRooms);
      })
      .catch((err) => console.error(err));
  });

  /* Create a room with a username */
  socket.on("create room", (obj, callback) => {
    const { roomName, roomType, username } = obj;
    let result = createRoomController(roomName, roomType, username);
    console.log("create room ");
    result
      .then((res) => {
        //  console.log(res);
        callback(res);
      })
      .catch((err) => console.error(err));
  });

  /* Join new room */
  socket.on("join room", (data) => {
    const { room_uuid, username } = data;
    console.log("Joining room " + room_uuid + " by " + username);
    const response = joinRoomController(room_uuid, username);
    response
      .then((res) => {
        socket.emit(res);
      })
      .catch((err) => console.error(err));
  });

  /* Get all public rooms */
  socket.on("get public rooms", (callback) => {
    let result = getPublicRoomsController();
    console.log("Get public rooms");
    result
      .then((publicRooms) => {
        console.log(publicRooms);
        callback(publicRooms);
      })
      .catch((err) => console.error(err));
  });
  /* END OF ROOMS */

  /*** FRIENDS ***/
  socket.on("get friends", (username, callback) => {
    console.log("in get friends for user : " + username);
    getFriendsController(username)
      .then((res) => {
        console.log(res);
        callback(res);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  socket.on("add friend", ({ username, friend, isFriendRequest }, callback) => {
    console.log(`${username} is adding ${friend} as a friend`);

    if (username === friend) {
      callback("you cannot be your own friend");
      return;
    }

    const user = getUserController(friend);
    if (user === null) {
      callback("this user does not exist");
    }

    addFriendController(username, friend).then((addedFriend) => {
      if (addedFriend) {
        callback("OK");

        if (isFriendRequest) {
          // if friend is online, send them a notification
          const targetUser = getIdByUsername(friend);
          if (targetUser !== "") {
            io.to(targetUser.id).emit("friend request", username);
          }
        }
      } else {
        callback(
          "you are already friends or have already sent a friend request to this user"
        );
      }
    });
  });

  socket.on("remove friend", ({ username, friend }, callback) => {
    console.log(`${username} is removing ${friend} as a friend`);
    let result = removeFriendController(username, friend);
    result
      .then((res) => {
        callback(res);
      })
      .catch((err) => console.error(err));
  });

  // only fetches friend requests from the DB
  socket.on("get requests", (username, callback) => {
    console.log("in get friend requests for user : " + username);
    getFriendRequestsController(username)
      .then((res) => {
        console.log(res);

        let friendRequests = [];
        if (res !== null) {
          friendRequests = res.map((x) => ({
            ...x,
            type: "friend",
          }));
        }
        callback(friendRequests);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  /*** END OF FRIENDS ***/

  /*** CHAT DATA ***/
  /* ON JOINING A NEW CHAT ROOM */
  socket.on("join", (event, callback) => {
    let { username, room } = event;
    const { error, user } = addUser({ id: socket.id, username, room });

    if (error) {
      return callback(error);
    }

    /* GET ALL USERS IN THE ROOM */
    const roomUsers = getUsersInRoom(user.room);
    let userMsg = createMessage(
      "text",
      `${username} Welcome to the room`,
      "admin"
    );
    /* SEND MESSAGE TO USER WHO JUST CONNECTED */
    socket.emit("message", userMsg);
    let roomMsg = createMessage("text", `${username} has Joined`, "admin");

    /* SEND MESSAGE TO OTHER USRES IN ROOM THAT NEW USER CONNECTED */
    socket.broadcast.to(user.room).emit("message", roomMsg);
    socket.join(user.room);

    /* SEND ROOM DATA TO EVERYONE IN ROOM WHEN NEW USER JOINS */
    io.to(user.room).emit("roomData", { room: user.room, users: roomUsers });

    callback();
  });

  /* GET A MESSAGE FROM A USER. THEN SEND THE MESSAGE TO THE ROOM */
  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    // console.log(
    //   `server got message ${message} by ${message.username} in room ${user.room}`
    // );
    let newMsg = createMessage(message.type, message.text, user.username, message.profilePic, );
    io.to(user.room).emit("message", newMsg);
  });

  /* User Leaves a room. remove from user list who are in rooms*/
  socket.on("leave room", (username) => {
    console.log("A user has left");
    const user = removeUser(socket.id);
    if (user) {
      let message = createMessage("text", `${user.username} has left`, "admin");
      io.to(user.room).emit("message", message);

      /* SEND ROOM DATA TO EVERYONE IN ROOM WHEN NEW USER LEAVES.  NOT YET IMPLEMENTED IN CLIENT SIDE */
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  /* REQUEST TO ADD USER TO ROOM. SEND NOTIFICATION TO TARGET USER IF ONLINE/EXISTS IN ALLUSRES ONLINE */
  socket.on("add user to room", (obj, callback) => {
    console.log(obj);
    const { user, roomObj, requestedBy } = obj;
    let targetUser = getIdByUsername(user);
    if (targetUser !== "") {
      let targetId = targetUser.id;
      let targetUsername = targetUser.username;
      if (targetUsername === requestedBy) {
        callback("add user same username");
      } else {
        callback("add user success");
        io.to(targetId).emit("room request", obj);
      }
    } else {
      callback("add user error");
    }
  });

  /* REQUEST TO KICK A USER FROM ROOM. SEND NOTIFICATION TO TARGET USER IF THEYRE IN ROOM AND SEND NEW ROOM DATA */
  socket.on("kick user from room", (obj, callback) => {
    console.log("in kick user");
    const { username, roomObj, requestedBy } = obj;
    let targetUser = getIdByUsernameRoom(username, roomObj.uuid);
    console.log(targetUser);
    if (targetUser !== "") {
      let targetId = targetUser.id;
      let targetUsername = targetUser.username;
      if (targetUsername === requestedBy) {
        callback("kick user same username");
      } else {
        callback("kick user success");
        io.to(targetId).emit("got kicked", obj);
      }
    } else {
      callback("kick user error");
    }
  });

  /* PERMANENTLY LEAVE A ROOM */
  socket.on("withdraw room", (msg, callback) => {
    const { room_uuid, username } = msg;
    let result = leaveRoomController(room_uuid, username);
    result
      .then((response) => {
        callback(response);
      })
      .catch((err) => console.error(err));
  });

  /* END OF CHAT DATA */

  /** On user disconnect */
  socket.on("disconnect", () => {
    console.log("A user disconected");
    removeUserAll(socket.id);
    const user = removeUser(socket.id);

    if (user) {
      let message = createMessage("text", `${user.username} has left`, "admin");
      io.to(user.room).emit("message", message);
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
