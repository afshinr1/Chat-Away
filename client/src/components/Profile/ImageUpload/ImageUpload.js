import React, { useState } from "react";
import { Button, Modal } from "@material-ui/core";
import firebase from "../../Utilities/Firebase";
import "./ImageUpload.css";
import { useStyles, getModalStyle } from "./Styles";

const ImageUpload = ({ user, setUserPicture }) => {
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  /* SET IMAGE WHEN UPLOAD FILE */
  const handleChange = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
  };

  /* ONCLICK UPLOAD, STORE IN FIREBASE STORAGE AND  CALL NEW FUNCTION TO STORE NEW IMAGE URL IN DATABSE */
  const handleUpload = (e) => {
    if (image) {
      const uploadTask = firebase
        .storage()
        .ref(`images/${image.name}`)
        .put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //Progress stuff
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //Error fnc
          console.log(error);
          alert(error.message);
        },
        () => {
          /* GET URL FROM STORAGE AND SET USER PICTURE */
          firebase
            .storage()
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUserPicture(url);
              setProgress(0);
              setImage(null);
              setOpen(false);
            });
        }
      );
    } else {
      alert("Missing one or more fields");
    }
  };

  return (
    <div className="image-upload">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <div className="image-upload-modal">
            <progress
              className="progress-bar"
              value={progress}
              max="100"
            ></progress>
            <input className="file" type="file" onChange={handleChange} />
            <Button variant="contained" color="default" onClick={handleUpload}>
              Upload
            </Button>
          </div>
        </div>
      </Modal>

      {/* OPEN MODAL */}
      <Button color="primary" disabled={user.google ? true : false} variant="contained" onClick={() => setOpen(true)}>
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
