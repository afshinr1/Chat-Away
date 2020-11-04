import { Badge, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
  /* Homepage Room column styles */
  box: {
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
  },
  homeIcon: {
    transform: "scale(2)",
    paddingRight: theme.spacing(1),
    color: "#27293D",
  },

  card: {
    minWidth: "100%",
    marginTop: theme.spacing(2),
    minHeight : '5rem',
  },
  cardHeader: {
    transform: "scale(1.2)",
  },
  userRooms: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  viewbtn: {
    margin: theme.spacing(1),
    maxWidth: "50%",
  },
  /* Homepage Room column styles END */


  /* CreateRoom Modal Styles */
  modalBox: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "50vh",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      height: "80vh",
    },
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "40vw",
    overflow : 'auto',
    height: "70vh",
    backgroundColor: "#0C2340",
    border: "2px solid #000",
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

  /* End Of CreateRoom Modal Styles */
}));

/* Style Add room button */
export const AddRoomButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "capitalize",
    fontSize: 20,
    padding: "20px 20px",
    border: "1px solid",
    borderRadius: "15px",
    lineHeight: 2,
    backgroundColor: "#FEFEFE",
    borderColor: "#0063cc",
    fontFamily: [
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0C2340",
      color: "#FEFEFE",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#27293D",
      borderColor: "#0C2340",
      color: "#FEFEFE",
    },
  },
})(Button);
/* ENd of styled button */

/* Style input text field in modal */
export const CssTextField = withStyles({
  root: {
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


/* Badge for add room button */
export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#0532BF",
    color: "#FFFEFF",
    fontSize: "1.3rem",
    padding: "12px 8px",
  },
}))(Badge);
