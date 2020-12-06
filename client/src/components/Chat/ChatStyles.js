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
  mainHeader : {
    display : 'flex',
    alignItems : "center",
    paddingLeft : '10px',
    paddingRight : '10px',
    color: "#0C2340",
  },
  btn: {
    width: "10%",
    margin: "10px 50px 10px 10px",
  },
  roomName : {
    fontFamily : "Roboto",
    [theme.breakpoints.up('sm')]: {
      fontSize : '1.6rem',
    },
    fontSize : '1rem',

  },
  /* END MAIN CHAT CONTAINER STYLES STYLES */

  /* COLUMN BORDER STYLES */
  col1: {
    border: "2px solid #0B44E3",
  },
  col2: {
    border: "2px solid #3C966F",
  },
  col3: {
    border: "2px solid #CC0000",
    padding: "10px",
  },

  /* MOBILE DRAWER STYLES START */
  drawerContainer: {},
  list: {
    backgroundColor: "#002340",
    width: 250,
    height: "100vh",
    flexGrow: 1,
  },
  lastElement: {
    color: "#FF0000",
    backgroundColor: "#0C2340",
  },
  divider : {
    backgroundColor : '#FEFEFE'
  },
  red: {
    color: "#FF0000",
  },
  blue: {
    color: "#0000FF",
  },
  green: {
    color: "#00FF00",
  },
  pink: {
    color: "#F50057",
  },


    /* MOBILE DRAWER STYLES END */

}));

/* BACK BUTTON STYLES */
export const BackButton = withStyles({
  root: {
    minWidth : '7rem',
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
