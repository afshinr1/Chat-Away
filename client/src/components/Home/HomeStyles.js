import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({

  /* APPLY STYLES TO INNER AND OUTER DIV CONTAINERS */
  innerContainer: {
    [theme.breakpoints.up("md")]: {
      flexGrow: 1,
    },
  },
  outerContainer: {
    backgroundColor: "#ECECEC",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    boxSizing: "border-box",
  },

  /* APPLY BORDER STYLES TO THE DIFFERENT COLUMNS */
  col1: {
    backgroundColor: "#F8F8FF",
    border: "2px solid #0C2340",
  },
  col2: {
    border: "2px solid #0C2340",
    backgroundColor: "#ECECEC",
    padding: "0px 5px 5px",
  },
  col3: {
    backgroundColor : "#FEFEFE",
    border: "3px solid #0C2340",
  },
  col4: {
    border: "2px solid #0C2340",
  },
}));

/*
  innerContainer : {
        backgroundColor : '#ECECEC',
        height: '90vh'
    }

  */
