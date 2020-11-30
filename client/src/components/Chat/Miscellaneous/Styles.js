import { Button, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

export const useStyles = makeStyles((theme) => ({

    /* START OF MISC CONTAINER STYLES */
  misc_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  addBtn: {
    margin: "10px",
  },

  addIcon: {
    fontSize: "2rem",
    margin: "5px",
  },

      /* END OF MISC CONTAINER STYLES */

}));



/* MEET BUTTON STYLES */
export const LeaveButton = withStyles({
  root: {
    boxShadow: "none",
    fontSize: 15,
    textTransform : "uppercase",
    margin : '20px 20px',
    letterSpacing : "2px",
    border: "1px solid",
    position : 'relative',
    borderRadius: "5px",
    lineHeight: 2,
    color : '#FF0101',
    borderColor: "#FF0505",
    transition : "all 650ms",
    fontFamily: [
      "Roboto",

    ].join(","),
    "&:hover": {
       backgroundColor: "#FC1926",
      color: "#FEFEFE",
      transform : "scale(1.1)",
    },
    "&:active": {
      // boxShadow: "none",
      // backgroundColor: "#27293D",
      // borderColor: "#0C2340",
      // color: "#FEFEFE",
    },
  },
})(Button);


/* DELETE BUTTON STYLES */
export const DeleteButton = withStyles({
  root: {
    boxShadow: "none",
    fontSize: 15,
    textTransform: "uppercase",
    margin: "20px 20px",
    letterSpacing: "2px",
    border: "1px solid",
    position: "relative",
    borderRadius: "5px",
    lineHeight: 2,
    color: "#F8F8FE",
    backgroundColor: "#FF0203",
    opacity: "50%",
    borderColor: "#FF0101",
    transition: "all 650ms",
    fontFamily: ["Roboto"].join(","),
    "&:hover": {
      color: "#F8F8FE",
      backgroundColor: "#FF0000",
      opacity: "100%",
      transform: "scale(1.1)",
    },
    "&:active": {
      // boxShadow: "none",
      // backgroundColor: "#27293D",
      // borderColor: "#0C2340",
      // color: "#FEFEFE",
    },
  },
})(Button);
