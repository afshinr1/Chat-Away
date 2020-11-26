const connection = require("../connection");

/* Get all users that a user is friends with*/
const getFriends = (username) => {
  return new Promise((resolve, reject) => {
        let query =
            "SELECT f1.* FROM friendships f1 INNER JOIN friendships f2 ON f1.user = f2.friend and f1.friend = f2.user WHERE user=?";
        connection.query(query, [username], (error, results, field) => {
        resolve(results);
    });
  });
};

/* send or accept a friend request */
const addFriend = (username, friend) => {
    return new Promise((resolve, reject) => {
        let query = "INSERT INTO friendships (user, friend) VALUES (?, ?)";
        connection.query(query, [username, friend], (error, results, field) => {
            resolve(results);
        });
    });
}

/* Deny a friend request, or remove a friend */
const removeFriend = (username, friend) => {
    return new Promise((resolve, reject) => {
        let query = "DELETE FROM friendships WHERE (user = ? AND friend = ?) OR (user = ? AND friend = ?)";
        connection.query(query, [username, friend, friend, username], (error, results, field) => {
            resolve(results);
        });
    });
}

module.exports.getFriends = getFriends;
module.exports.addFriend = addFriend;
module.exports.removeFriend = removeFriend;