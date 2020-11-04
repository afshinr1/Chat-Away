const express = require("express");
const router = express.Router();
const userModel = require("../models/authModel");

/* Filler */
router.get("/", (req, res, next) => {
  res.json("user");
});


/*  When user logs in with credentials, this function is used */
router.post("/signin", async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  let result = await userModel.validate(username, password);
  console.log(result);
  if (result.user) {
    delete result.user.password;
    res.status(200).send(result);
  } else res.send(result);
});


/*  When user Registers, this  function is used */
router.post("/register", async (req, res, next) => {
  let { firstName, lastName, username, password, email } = req.body;
  console.log(firstName, lastName, username, password, email);
  try {
    results = await userModel.register(
      firstName,
      lastName,
      username,
      password,
      email
    );
    console.log(results);
    res.status(200).send(results);
  } catch {
    console.log("error in register model");
  }
});
module.exports = router;
