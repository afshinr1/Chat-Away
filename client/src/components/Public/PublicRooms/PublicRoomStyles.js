import {  makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  /* Homepage Room column styles */
  container: {
    maxHeight : '70vh',
    overflow: 'auto'
  },
  card: {
    margin : '10px'
  },

  avatar: {
    backgroundColor:'#42a5f5',
  },
  iconBtn : {
    color :'#4caf50',
    transform : 'scale(1.1)'
  },
  iconBtnErr : {
    color : '#f44336',
    transform : 'scale(1.1)'

  },
  /* Homepage Room column styles END */

/* SEARCH BAR STYLES */
search: {
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  color: "#000000",
  backgroundColor: '#ACE5FF',
  "&:hover": {
    backgroundColor: '#B1D2FB',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  marginTop : theme.spacing(2),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
},
searchIcon: {
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  color : '#000000',
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
},
inputRoot: {
  color: "inherit",
},
inputInput: {
  padding: theme.spacing(1, 1, 1, 0),
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
  transition: theme.transitions.create("width"),
  width: "100%",
  [theme.breakpoints.up("md")]: {
    width: "20ch",
  },
},

/* SEARCH BAR STYLES END */
}));