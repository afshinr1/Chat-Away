import React from "react";
import DrawingBoard from "react-drawing-board";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { IconButton } from "@material-ui/core";

/* SET THE MODAL WIDTH/HEIGHT AND STYLES FOR OUTER CONTAINER. ALSO EXIT ICON STYLES */
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  icon: {
    position: "absolute",
    top: "3%",
    left: "90%",
    zIndex: "2",
    color: "red",
    border: "5px solid red",
  },
}));

/* HEIGHT AND WIDTH OF MODAL */
const drawingStyles = {
  width: "70vw",
  height: "70vh",
};

/* MAIN DRAW MODAL COMPONENT */
function DrawModal({ handleImage, open, handleClose }) {
  const classes = useStyles();

  /* USED TO SEND IMAGE TO SERVER */
  const handleSave = (image) => {
    //  console.log(image);
    handleImage(image.dataUrl);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <div className={classes.container}>
        <IconButton className={classes.icon} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DrawingBoard style={drawingStyles} onSave={handleSave} />
      </div>
    </Modal>
  );
}

export default DrawModal;
