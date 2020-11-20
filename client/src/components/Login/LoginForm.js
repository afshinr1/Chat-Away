import React, { useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { CssTextField, useStyles } from "./LoginStyles";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";

function LoginForm({ responseGoogle, handleValidate, message }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const classes = useStyles();

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      if(username && password)
        handleValidate(username, password);
    }
  };

  return (
    <form className={classes.form}>
      <Typography className={classes.white} variant="h4">Login Form</Typography>
      <Typography variant="body2" className={classes.error} gutterBottom>
        {message}
      </Typography>
      <CssTextField
        className={classes.textField}
        color="primary"
        label="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        required
      />
      <CssTextField
        className={classes.textField}
        color="primary"
        label="Password"
        type="password"
        onKeyDown={handleEnter}

        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />
      <Button
        className={classes.form_btn}
        variant="contained"
        color="primary"
        onClick={() => handleValidate(username, password)}
        disabled={username && password ? false : true}
      >
        Submit
      </Button>
      <Divider
        component="hr"
        orientation="vertical"
        className={classes.divider}
      />

      <Typography className={classes.white} variant="subtitle2">Feeling lucky?</Typography>

      <GoogleLogin
        className={classes.google}
        theme="dark"
        clientId="1026081474984-4aa5rju8gf6n94630l2lqdl6iabjvfdv.apps.googleusercontent.com"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        tag={Button}
      />

      <NavLink className={classes.link} to="/Register">
        New User? Register
      </NavLink>
    </form>
  );
}

export default LoginForm;
