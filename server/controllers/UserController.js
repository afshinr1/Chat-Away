const { getUser } = require("../models/usersModel");

/* Get all friends of the user from DB*/
const getUserController = async (username) => {
  const response = await getUser(username);
  return response;
};

module.exports = {
    getUserController
};
