import {  makeStyles } from "@material-ui/core";


export const useStyles = makeStyles((theme) => ({
  /* USED TO STYLE EMOJI ICON BUTTON */
  emojiBtn: {
    color: "yellow",
    backgroundColor: "#30445C",
    borderRadius: "4px",

    "&:hover": {
      backgroundColor: "#0C2340",
    },
  },
}));
