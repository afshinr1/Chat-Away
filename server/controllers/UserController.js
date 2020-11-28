const { getUser, setUserProfilePicture } = require("../models/usersModel");

/* Get all friends of the user from DB*/
const getUserController = async (username) => {
  const response = await getUser(username);
  return response;
};

/* Sets profile picture for a user*/
const setUserProfilePicController = async (username, image) => {
  const response = await setUserProfilePicture(username, image);
  return response;

}

module.exports = {
    getUserController,
    setUserProfilePicController
};
