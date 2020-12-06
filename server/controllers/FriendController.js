const { response } = require("express");
const { getFriends, getFriendRequests, addFriend, removeFriend } = require("../models/friendsModel");

/* Get all friends of the user*/
const getFriendsController = async (username) => {
  const response = await getFriends(username);
  return response;
};

/* Get all friend requests of user. NOT USED CURRENTLY */
const getFriendRequestsController = async (username) => {
  const response = await getFriendRequests(username);
  return response;
}

/* Add a friend to user */
const addFriendController = async(username, friend) => {
  const response = await addFriend(username, friend);
  return response;
}

/* Remove a friend from user */
const removeFriendController = async(username, friend) => {
  const response = await removeFriend(username, friend);
  return response;
}

module.exports = {
  getFriendsController,
  getFriendRequestsController,
  addFriendController,
  removeFriendController
};
