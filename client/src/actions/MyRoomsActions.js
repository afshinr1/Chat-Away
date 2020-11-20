/* Set global state for my rooms */
export const setMyRooms = (rooms) => {
  return { type: "SET_MYROOMS", payload: rooms };
};

/* Add a room to myRoomss */
export const addRoom = (room) => {
  return { type: "ADD_ROOM", payload: room };
};
