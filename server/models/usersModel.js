const connection = require("../connection");

/* get the user corresponding to the username from the database*/
const getUser = (username) => {
    return new Promise((resolve, reject) => {
            let query =
                "SELECT * FROM users WHERE username=?";
            connection.query(query, [username], (error, results, field) => {
            resolve(results);
        });
    });
};

module.exports.getUser = getUser;