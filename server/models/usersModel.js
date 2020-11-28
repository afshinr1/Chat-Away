const connection = require("../connection");

/* get the user corresponding to the username from the database*/
const getUser = (username) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM users WHERE username=?";
    connection.query(query, [username], (error, results, field) => {
      resolve(results);
    });
  });
};

/* Set profile picture image URL for a user */
const setUserProfilePicture = (username, image) => {
  return new Promise((resolve, reject) => {
    let query = "UPDATE users SET profileimg=? WHERE username=?";

    connection.query(query, [image, username], (error, results, field) => {
      if (error) reject(error);
      else resolve("Successfully changed!");
    });
  });
};

module.exports.getUser = getUser;
module.exports.setUserProfilePicture = setUserProfilePicture;
