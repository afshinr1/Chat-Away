import { Button, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({
    /* MAIN CHAT CONTAINER STYLES STYLES */

  innerContainer: {
    flexGrow: 1,
    overflow: "auto",
  },
  outerContainer: {
    backgroundColor: "#FEFEFE",
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
    height: "100vh",
    boxSizing: "border-box",
  },

  btn: {
    width: "10%",
    margin: "10px 50px 10px 10px",
  },
    /* END MAIN CHAT CONTAINER STYLES STYLES */



  /* COLUMN BORDER STYLES */
  col1: {
    border: "1px solid #0000FB",
  },
  col2: {
    border: "1px solid #01FC01",
  },
  col3: {
    border: "1px solid #FF0000",
  },
}));


/* BACK BUTTON STYLES */
export const BackButton = withStyles({
  root: {
    position: "relative",
    lineHeight: 2,
    backgroundColor: "#0C2340",
    color: "#FEFEFE",
    borderColor: "#0063cc",
    fontFamily: [].join(","),
    "&:hover": {
      backgroundColor: "#0C2340",
      opacity: "80%",
      color: "#FEFEFE",
    },
    "&:active": {
      borderColor: "#0C2340",
    },
  },
})(Button);
