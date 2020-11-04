import React, { useState } from "react";
import { Box } from "@material-ui/core";
import { useStyles } from "./LoginStyles";
import LoginForm from "./LoginForm";
import { history } from "../Utilities/History";

import axios from "axios";
import { API } from "../Utilities/API";

function Login(props) {
  const [message, setMessage] = useState("");
  const classes = useStyles();

    /* Handles validating the user with google login. Set user in storage and go to app */
  const responseGoogle = (response) => {
    const user = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      profile_img: response.profileObj.imageUrl,
      role: null,
      username: response.profileObj.name,
    };

    sessionStorage.setItem("user", JSON.stringify(user));
    history.push("/");
  };

  /* Handles validating the user with username and password. If user exists, login. else give message */
  const handleValidate = (username, password) => {
    axios
      .post(API.SIGNIN, {
        username: username,
        password: password,
      })
      .then((response) => {
      //  console.log(response);
        if (response.data.user) {
          sessionStorage.setItem("user", JSON.stringify(response.data.user));
          props.handleLogin();
          history.push("/");
        } else {
          setMessage("Invalid username/password");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

    /* Render Login form and image */
  return (
    <Box component="div" className={classes.root}>
      <LoginForm
        responseGoogle={responseGoogle}
        handleValidate={handleValidate}
        message={message}
      />
      <img
        className={classes.img_logo}
        src={`${process.env.PUBLIC_URL}/images/logo.png`}
        alt="Logo.png"
      />
    </Box>
  );
}

export default Login;
