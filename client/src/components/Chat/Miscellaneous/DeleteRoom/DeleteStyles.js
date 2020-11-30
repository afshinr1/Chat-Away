import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles, Typography } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

export const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: "#1E1E2F",
  },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    backgroundColor: "#1E1E2F",
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: "#27293D",
    color: "#FF0102",
  },
  accordian : {
    backgroundColor: "#27293D",

  },
  deleteBtn: {
    backgroundColor: "#CC0202",
    color: "#FEFEFE",
    "&:hover": {
      backgroundColor: "#FF0101",
      color: "#F8F8F8",
    },
  },

  red: {
    color: "#FF0000",
  },
  white : {
      color : '#FEFEFE'
  }
}));
