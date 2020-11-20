const { v4: uuidv4 } = require("uuid");
const { createRoom, joinRoom, getMyRooms, getPublicRooms } = require("../models/roomsModel");

/* Create a room controller. Creates unique uuid for new room, and requests database to add room */
const createRoomController = async (roomName, roomType, username) => {
  let uuid = uuidv4();
  const response = await createRoom(uuid, roomName, roomType, username);
  let message = "";
  if (response === null) {
    message = "Room name exists";
  } else {
    message = "Created successfully";
    joinRoomController(uuid, username);
  }
  return { newRoom: response, message: message };
};

/* Join a room with the rooms UUID and the users uesrnamw who wants to join */
const joinRoomController = async (room_uuid, username) => {
  const response = await joinRoom(room_uuid, username);
  return response;
};

/* Get all rooms that the user is CURRENTLY joined */
const getMyRoomsController = async (username) => {
  const myRooms = await getMyRooms(username);
  return myRooms;
};

/* Get all public rooms*/
const getPublicRoomsController = async () => {
    const publicRooms = await getPublicRooms();
    return publicRooms;
  

};

module.exports = {
  createRoomController,
  getMyRoomsController,
  joinRoomController,
  getPublicRoomsController,
};
