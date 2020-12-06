let usersInRoom = [];
let allUsers = [];

/* ADD A USER WHEN THEY JOIN IN A CHAT ROOM */
const addUser = ({ id, username,profile_img, room }) => {
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existing = usersInRoom.find(
    (user) => user.room === room && user.username === username
  );
  if (existing) {
    return { error: "Userrname is taken" };
  } else {
    const user = { id, username,profile_img, room };
    usersInRoom.push(user);
    return { user };
  }
};

/* REMOVE A USER FROM A CHAT ROOM ONCE HE LEAVES A ROOM OR DISCONNECTS */
const removeUser = (id) => {
  const index = usersInRoom.findIndex((user) => id === user.id);
  if (index !== -1) {
    return usersInRoom.splice(index, 1)[0];
  }
};

/* GET A USER IN A ROOM WITH THEIR ID */
const getUser = (id) => {
  let user = usersInRoom.find((user) => user.id === id);
  return user;
};

/* GET ALL USERS IN A ROOM */
const getUsersInRoom = (room) => {
  let roomUsers = usersInRoom.filter((user) => user.room === room);
  return roomUsers;
};

/* ADD A USER WHEN THEY FIRST CONNECT TO MAIN APP */
const addUserAll = (id, username) => {
  username = username.trim().toLowerCase();
  const user = { id, username };
  allUsers.push(user);
};

/* REMOVE A USER WHEN THEY DISCONNECT CONNECT FROM MAIN APP */
const removeUserAll = (id) => {
  allUsers = allUsers.filter(user => user.id !== id);
  // const index = allUsers.findIndex((user) => id === user.id);
  // if (index !== -1) {
  //   return allUsers.splice(index, 1)[0];
  // }
};

/* GET SOCKET ID WITH USERNAME, USED FOR SENDING NOTIFICATION TO SEPCIFIC USERNAME USING THEIR SOCKET ID */
const getIdByUsername = (username) => {
  console.log(allUsers, username);
  let targetUser = "";
  allUsers.forEach((user) => {
    if (user.username === username) {
      targetUser = user;
    }
  });
  return targetUser;
};

/* GET SOCKET ID WITH USERNAME, USED KICKING SOMEONE FROM ROOM USING THEIR SOCKET ID */
const getIdByUsernameRoom = (username, room) => {
  let targetUser = "";
  usersInRoom.forEach((user) => {
    if (user.username === username && user.room === room) {
      targetUser = user;
    }
  });
  return targetUser;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  addUserAll,
  removeUserAll,
  getUsersInRoom,
  getIdByUsernameRoom,
  getIdByUsername,
};
