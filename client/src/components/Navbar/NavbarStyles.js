import { fade, makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  white: {
    color: "#FEFEFE",
  },
  navbar: {
    backgroundColor: "#0C2340",
  },
  toolbar : {
    display : 'flex',
    justifyContent : 'space-between'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
  
    color: "#FEFEFE",
    
  },
  img_logo: {
    height: "3rem",
    width: "3rem",
    cursor: "pointer",
    paddingRight: theme.spacing(1),
    objectFit: "contain",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
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
  logout: {
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
  },
  slogan : {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
      fontSize : '1.5rem',

    },
    [theme.breakpoints.up("md")]: {
      fontSize : '2rem',
    },
    color : "#FFFFFF",
    marginLeft : '3rem',
    fontWeight : '500',
    fontFamily : "Brush Script MT",
  },
}));


