import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  innerContainer: {
    flexGrow: 1,
  },
  outerContainer: {
    backgroundColor: "#ECECEC",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    boxSizing: "border-box",
  },
  col3: {
    height: "100%",
    backgroundColor: "#FEFEFE",
    border: "2px solid blue",
  },
}));

/*
  innerContainer : {
        backgroundColor : '#ECECEC',
        height: '90vh'
    }

  */
