import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  /* USED TO STYLE EMOJI ICON BUTTON */
  emojiBtn: {
    color: "yellow",
    backgroundColor: "#30445C",
    borderRadius: "4px",
    height: "100%",

    "&:hover": {
      backgroundColor: "#0C2340",
    },
  },
  message_input: {
    // border : '2px solid #000103',
    flex: "0.9",
    borderRadius: '4px',
    paddingLeft: '0.5rem',
    fontSize: "1.2rem",
    fontWeight: "bolder",
  },
}));
