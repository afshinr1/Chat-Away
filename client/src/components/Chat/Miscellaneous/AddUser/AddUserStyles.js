import {TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    btn: {
        width : '50%',
        margin : '10px'
    },

  /* ADdUser Modal Styles */
  modalBox: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "50vh",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      height: "50vh",
    },
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40vw",
    overflow : 'auto',
    height: "40vh",
    backgroundColor: "#0C2340",
    border: "2px solid #45698C",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    color: "#FEFEFE",
    padding: theme.spacing(2, 4, 3),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    textAlign: "center",
  },
  white: {
    color: "#FEFEFE",
  },

  m4: {
    margin: theme.spacing(4),
  },
  closeIcon: {
    color: "#FEFFFE",
    position: "absolute",
    right: 0,
    top: 0,
  },

  /* End Of AddUser Modal Styles */
}));


/* Style input text field in modal */
export const AddUserTextField = withStyles({
  root: {
    margin : '10px',
    "& input": {
      color: "white",
    },
    "& label": {
      color: "#FEFEFE",
    },
    "& label.Mui-focused": {
      color: "#FEFEFE",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
})(TextField);
/* END of styled input text field in modal */



/* Modal positioning, center of screen */
export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
