const connection = require("../connection");

/* Check if user exists in database with usename and password. If exists, return user else return null */
const validate = (username, password) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM users WHERE username=? AND password=?";
    connection.query(query, [username, password], (error, results, fields) => {
      if (results.length > 0) {
        resolve({
          user: {
            email: results[0].email,
            username: results[0].username,
            password: results[0].password,
            role: results[0].role,
            firstName: results[0].firstname,
            lastName: results[0].lastname,
            profile_img: results[0].profileimg,
          },
        });
      } else {
        resolve({ user: null });
      }
    });
  });
};

  /* 
  Check if user exists in database with usename  or email. If exists, return user exists, 
  else register new user with given credentials 
   */

const register = (firstName, lastName, username, password, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE username=? OR email=?",
      [username, email],
      (error, results, fields) => {
        if (results.length > 0) {
          resolve("false");
        } else {
          let sql =
            "INSERT INTO users (username, password, role, email, firstname, lastname) VALUES (?, ?, ?, ?, ?, ?)";
          connection.query(
            sql,
            [username, password, "User", email, firstName, lastName],
            (error, results, fields) => {
              resolve("true");
            }
          );
        }
      }
    );
  });
};


module.exports.validate = validate;
module.exports.register = register;
