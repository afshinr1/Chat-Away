const connection = require("../connection");

/* Get all users that a user is friends with*/
const getFriends = (username) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT * FROM friends f1, users u1 WHERE (f1.username=? AND u1.username = f1.friend) OR (f1.friend=? AND u1.username = f1.username)";
    connection.query(query, [username, username], (error, results, field) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

/* Get all pending friend requests. NOT USED CURRENTLY */
const getFriendRequests = (username) => {
  return new Promise((resolve, reject) => {
    let query0 =
      "SELECT f1.user, f1.friend FROM friendships f1 WHERE f1.friend=? AND NOT EXISTS(SELECT f2.user, f2.friend FROM friendships f2 WHERE f2.user=f1.friend AND f2.friend=f1.user)";
    connection.query(query0, [username], (error, results, field) => {
      if (error) reject(error);
      resolve(results);
    });
  });
};

/* send or accept a friend request */
const addFriend = (username, friend) => {
  return new Promise((resolve, reject) => {
    let query1 = "INSERT INTO friends (username, friend) VALUES (?, ?)";
    connection.query(query1, [username, friend], (error, results, field) => {
      resolve(true);
    });
  });
};

/* Deny a friend request, or remove a friend */
const removeFriend = (username, friend) => {
  return new Promise((resolve, reject) => {
    let query =
      "DELETE FROM friends WHERE (username = ? AND friend = ?) OR (username = ? AND friend = ?)";
    connection.query(
      query,
      [username, friend, friend, username],
      (error, results, field) => {
        resolve(results);
      }
    );
  });
};

module.exports.getFriends = getFriends;
module.exports.getFriendRequests = getFriendRequests;
module.exports.addFriend = addFriend;
module.exports.removeFriend = removeFriend;
