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
  createRoomController,
  getPublicRoomsController,
  joinRoomController,
  getMyRoomsController,
} = require("./controllers/RoomController");
const { createMessage } = require("./utilities/Messages");
const { create } = require("domain");
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
  console.log("A user has connected " + socket.id);

  /* Add user to all user list on first connect*/
  socket.on("connection", (username) => {
    console.log("on first connect", username);
    addUserAll(socket.id, username);
  });
  /* ROOMS */

  /* Get all rooms for a user */
  socket.on("get myRooms", (username) => {
    console.log("in get rooms for user : " + username);
    let result = getMyRoomsController(username);
    result.then((myRooms) => {
      socket.emit("my rooms data", myRooms);
    });
  });

  /* Create a room with a username */
  socket.on("create room", (obj) => {
    const { roomName, roomType, username } = obj;
    let result = createRoomController(roomName, roomType, username);
    console.log("create room ");
    result.then((res) => {
    //  console.log(res);
      socket.emit("create room response", res);
    });
  });

  /* Join new room */
  socket.on("join room", (data) => {
    const { room_uuid, username } = data;
    console.log("Joining room " + room_uuid + " by " + username);
    const response = joinRoomController(room_uuid, username);
    response.then((res) => {
      socket.emit(res);
    });
  });

  /* Get all public rooms */
  socket.on("get public rooms", () => {
    let result = getPublicRoomsController();
    console.log("Get public roosm ");
    result.then((publicRooms) => {
      console.log(publicRooms);
      socket.emit("public room data", publicRooms);
    });
  });
  /* END OF ROOMS */

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
    let newMsg = createMessage(message.type, message.text, user.username);
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
  socket.on("add user to room", (obj) => {
    console.log(obj);
    const { user, roomObj, requestedBy } = obj;
    let targetUser = getIdByUsername(user);
    if (targetUser !== "") {
      let targetId = targetUser.id;
      let targetUsername = targetUser.username;
      if (targetUsername === requestedBy) {
        socket.emit("add user same username");
      } else {
        socket.emit("add user success");
        io.to(targetId).emit("room request", obj);
      }
    } else {
      socket.emit("add user error");
    }
  });

  /* REQUEST TO KICK A USER FROM ROOM. SEND NOTIFICATION TO TARGET USER IF THEYRE IN ROOM AND SEND NEW ROOM DATA */
socket.on('kick user from room', obj => {
  console.log('in kick user');
  const { username, roomObj, requestedBy } = obj;
  let targetUser = getIdByUsernameRoom(username, roomObj.uuid);
  console.log(targetUser);
  if (targetUser !== "") {
    let targetId = targetUser.id;
    let targetUsername = targetUser.username;
    if (targetUsername === requestedBy) {
      socket.emit("kick user same username");
    } else {
      socket.emit("kick user success");
      io.to(targetId).emit("got kicked", obj);
   }
  } else {
    socket.emit("kick user error");
  }


})

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
