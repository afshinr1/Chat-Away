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
    border: "1px solid red",
  },
  col2: {
    border: "1px solid blue",
  },
  col3: {
    backgroundColor: "#F8F8FF",
    border: "2px solid blue",
  },
  col4: {
    border: "1px solid #00FF00",
  },
}));

/*
  innerContainer : {
        backgroundColor : '#ECECEC',
        height: '90vh'
    }

  */
