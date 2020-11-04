const bodyParser = require("body-parser");

const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { createRoomController, getMyRoomsController } = require("./controllers/RoomController");
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
  console.log("A user has connected");

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
      console.log(res);
      socket.emit("create room response", res);
    });
  });

  /** On user disconnect */
  socket.on("disconnect", () => {
    console.log("A user disconected");
  });
});



server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
