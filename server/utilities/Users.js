const users = [];

/* ADD A USER CURRENTLY IN A CHAT ROOM */
const addUser = ( {id, username, room} ) =>{
 username = username.trim().toLowerCase();
 room = room.trim().toLowerCase();

 const existing = users.find((user)=> user.room === room && user.username === username);
 if(existing){
     return {error: 'Userrname is taken'};
 }
 else{
     const user = {id, username, room};
     users.push(user);
     return {user};
 }
}

/* REMOVE A USER FROM A CHAT ONCE HE LEAVES A ROOM OR DISCONNECTS */
const removeUser = (id) =>{
    const index = users.findIndex(user => id===user.id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }

}

/* GET A USER WITH THEIR ID */
const getUser = (id) => {
   let user= users.find(user => user.id === id);
   return user;
}

/* GET ALL USERS IN A ROOM */
const getUsersInRoom = (room) => {
    let roomUsers = users.filter(user => user.room === room);
    return roomUsers;
}

module.exports = {addUser, removeUser, getUser, getUsersInRoom}