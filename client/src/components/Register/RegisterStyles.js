import { withStyles } from "@material-ui/styles";
import { makeStyles, TextField } from "@material-ui/core";

/* Input text field styles */
export const CssTextField = withStyles({
  root: {
    "& input": {
      color: "white",
    },
    "& label": {
      color: "#1E8CF8",
    },
    "& label.Mui-focused": {
      color: "#1E8CF8",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
})(TextField);
/* END of Input text field styles */

export const useStyles = makeStyles((theme) => ({
  /* Register container styles */

  root: {
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      justifyContent: "center",
    },
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#1E1E2F",
    color: "#FEFEFE",
    display: "flex",
    alignItems: "center",
  },
  white : {
    color : "#FEFEFE"
  },
  /* End of Register container styles */

  
  /* Register form styles */
  form: {
    [theme.breakpoints.up("sm")]: {
      width: "50vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
    height: "auto",
    display: "flex",
    flexDirection: "column",
    margin: "0 auto",
    padding: "10px",
    border: "1px solid white",
    boxSizing: "border-box",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#27293D",
  },
  textField: {
    color: "#FF0",
    width: "50%",
    margin: theme.spacing(2),
  },
  form_btn: {
    margin: theme.spacing(2),
    width: "40%",
  },
  divider: {
    height: "2px",
    backgroundColor: "#FEFEFE",
    width: "100%",
    margin: theme.spacing(1),
  },
  link: {
    color: "#f50057",
    margin: theme.spacing(1),
    textTransform: "capitalize",
    fontSize: "1.3rem",
  },
  margin: {
    margin: theme.spacing(1),
  },
  label: {
    color: "#FEFEFE",
  },
  img_logo: {
    [theme.breakpoints.down("sm")]: {
      width: "5rem",
      height: "5rem",
    },
    width: "25rem",
    height: "25rem",
    objectFit: "contain",
  },
  success: {
    color: "#11BF93",
  },
  error: {
    color: "#BF1103",
  },

  /* End of Register form styles */
}));
