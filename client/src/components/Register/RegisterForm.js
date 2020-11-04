import React, { useState } from "react";
import { Button, Divider, Typography } from "@material-ui/core";
import { CssTextField, useStyles } from "./RegisterStyles";
import { NavLink } from "react-router-dom";

function RegisterForm({ handleRegister, message }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const classes = useStyles();

  const validateRegister = () => {
    handleRegister(username, email, firstName, lastName, password);
  };

  return (
    <form className={classes.form}>
      <Typography variant="h4">Register Form</Typography>
      <Typography
        variant="body2"
        className={
          message.includes("Success") ? classes.success : classes.error
        }
      >
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
        label="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />
      <CssTextField
        className={classes.textField}
        color="primary"
        label="First Name"
        type="text"
        onChange={(e) => setFirstName(e.target.value)}
        value={firstName}
        required
      />
      <CssTextField
        className={classes.textField}
        color="primary"
        label="Last Name"
        type="text"
        onChange={(e) => setLastName(e.target.value)}
        value={lastName}
        required
      />
      <CssTextField
        className={classes.textField}
        color="primary"
        label="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <Button
        className={classes.form_btn}
        variant="contained"
        color="primary"
        onClick={validateRegister}
        disabled={
          username && password && email && firstName && lastName ? false : true
        }
      >
        Submit
      </Button>
      <Divider
        component="hr"
        orientation="vertical"
        className={classes.divider}
      />

      <NavLink className={classes.link} to="/login">
        Login Instead
      </NavLink>
    </form>
  );
}

export default RegisterForm;
