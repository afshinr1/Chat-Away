import { Button, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
    meet_container : {
        position : 'relative',
        backgroundColor : "#FEFEFE",

    },
    speechIcon : {
        position :'absolute',
        top : '-20px',
        right : "-10px",
        color : '#303030',
        fontSize : '2.1rem',
    },

    btn_logo : {
        paddingTop : '2rem',
        paddingBottom : '2rem',
        height : '70%',
        width : '70%',
        objectFit : 'contain',
        opacity : '80%',
        transition : "all 650ms",
        border : 'none',
        outline : 'none',
        '&:hover': {
            opacity : '100%',
            transform : 'scale(1.1)'
        },
        '&:active':{
            outline : 'none'
        }
     
    },

    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  
  }));


/* MEET BUTTON STYLES */
export const MeetButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "capitalize",
      fontSize: 20,
      padding: "20px 20px",
      margin : '20px 20px',
      border: "1px solid",
      position : 'relative',
      borderRadius: "15px",
      lineHeight: 2,
      backgroundColor: "#F2F2F2",
      borderColor: "#303030",
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
      "&:hover": {
        backgroundColor: "#777777",
        color: "#FEFEFE",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#27293D",
        borderColor: "#0C2340",
        color: "#FEFEFE",
      },
    },
  })(Button);