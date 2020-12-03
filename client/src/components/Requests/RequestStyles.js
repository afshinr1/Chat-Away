const { makeStyles } = require("@material-ui/core");

export const useStyles = makeStyles((theme) => ({
  /* MAIN REQUEST CONTAINER STYLES */
  requestsContainer : {
    height : '80vh',
    overflow : "auto"
  },
  requestList: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  
  },
  requestIconContainer: {
    display: "flex",
    justifyContent: "center",
  },
  badge: {
    marginTop: "20px",
    alignItems: "center",
  },
  noRequests: {
    letterSpacing: "3px",
    textTransform: "uppercase",
    padding: "10px",
    margin: "25px",
    color: "#0C2340",
    borderRadius: "5px",
    textAlign: "center",
    boxShadow: "3px 3px 3px 3px",
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
  },
  friendList: {
    display: "flex",
    flexDirection: "column",
    // flexWrap: "wrap",
    // justifyContent: "center",
    alignItems: "center",
  },

  /* END MAIN REQUEST CONTAINER STYLES */

  /* START REQUEST CARD STYLES */
  card_container: {
    width: "50%",
    marginTop: "10px",
  },
  card: {
    [theme.breakpoints.up("md")]: {
      maxWidth: 300,
    },
    maxWidth: 400,
    margin: "10px",
    paddingTop: "10px",
  },
  media: {
    height: 140,
    opacity: "80%",
    position: "relative",
    textAlign: "center",
  },
  roomName: {
    fontWeight: "900",
  },

  action: {
    display: "flex",
    width: "100%",
    justifyContent: "space-around",
  },
  check_icon: {
    color: "#00FF00",
  },
  cancel_icon: {
    color: "#FF0001",
  },
  scale: {
    [theme.breakpoints.down("sm")]: {
      transform: "scale(1.2)",
    },
  },

  /* END  REQUEST CARD STYLES */
}));
