import { Avatar, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import { socket } from "../Utilities/API";
import ImageUpload from "./ImageUpload/ImageUpload";
import {useStyles} from './ProfileStyles'

function Profile() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const classes = useStyles();

  /* CHANGE USER PROFILE PICTURE GIVEN IMAGE URL AND SET IN DB */
  const setUserPicture = (imageURL) => {
    const newUser = { ...user, profile_img: imageURL };
    setUser(newUser);
    sessionStorage.setItem("user", JSON.stringify(newUser));
    const sendData = {username : user.username, image : imageURL};
    socket.emit("image upload", sendData, response => {
            toast.success(response);
    });

  };
  return (
    <div>
      <Navbar />
      <div className={classes.outerContainer}>

        {/* PROFILE IMAGE STUFF */}
        <div className={classes.imageContainer}>
          <Avatar className={classes.avatar} src={`${user.profile_img}`} alt="" />
          <ImageUpload setUserPicture={setUserPicture} user={user} />
        </div>

        
        <div className={classes.userInfo}>
        <Typography>Username : {user.username}</Typography>
        <Typography>Email : {user.email}</Typography>
        <Typography>First Name : {user.firstName}</Typography>
        <Typography>Last Name : {user.lastName}</Typography>
        </div>
    
      </div>
    </div>
  );
}

export default Profile;
