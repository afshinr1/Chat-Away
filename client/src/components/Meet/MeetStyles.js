import { Button, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";


export const useStyles = makeStyles((theme) => ({
    meet_container : {
        position : 'relative',
        backgroundColor : "#FEFEFE",
        dsplay : 'flex',
       // textAlign : "center",
        flexDirection : "column",
        boxSizing : 'border-box'

    },
    top_half : {
      justifyContent : 'center',
      alignItems : 'center',
      textAlign : 'center',
    },
    bottom_half : {
      display : 'flex',
      paddingTop : '50px',
      paddingBottom : '20px',
      height : "50%",
      justifyContent : 'center',
      alignItems : "center",

     },
    speechIcon : {
        position :'absolute',
        top : '-20px',
        right : "-10px",
        color : '#0C2340',
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
    divider : {
      backgroundColor : "#0C2340",
      height : "3px"
    },
  
  }));


/* MEET BUTTON STYLES */
export const MeetButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "capitalize",
      fontSize: 20,
      cursor : 'none',
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
  
    },
  })(Button);