import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./RegisterStyles";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { API } from "../Utilities/API";
function Register() {
  const classes = useStyles();
  const [message, setMessage] = useState("");

  /* Handles registering new user. If username exists, send an error, else give success message */
  const handleRegister = (username, email, firstName, lastName, password) => {
    axios
      .post(API.REGISTER, { username, email, firstName, lastName, password })
      .then((response) => {
       // console.log(response);
        if(response.data === true){
          setMessage("Register Success!");
        }
        else setMessage("Error, username/email taken already!")
      })
      .catch(err => console.log(err));
  };

  return (
    <Box component="div" className={classes.root}>
      <RegisterForm handleRegister={handleRegister} message={message} />
      <img
        className={classes.img_logo}
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="Logo.png"
      />
    </Box>
  );
}

export default Register;
