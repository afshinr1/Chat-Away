const { response } = require("express");
const { getFriends, addFriend, removeFriend } = require("../models/friendsModel");

/* Get all friends of the user*/
const getFriendsController = async (username) => {
  const response = await getFriends(username);

  let message = null;
  if (response === null) {
    message = "Username does not exist";
  } else {
    message = "Friends found";
  }
  return { friends: response, message };
};

/* Add a friend to user */
const addFriendController = async(username, friend) => {
    const response = await addFriend(username, friend);
    console.log(response);
    // TODO update friendslist
}

/* Remove a friend from user */
const removeFriendController = async(username, friend) => {
    const response = await removeFriend(username, friend);
    console.log(response);

    // TODO update friendslist
}

module.exports = {
  getFriendsController,
  addFriendController,
  removeFriendController
};
