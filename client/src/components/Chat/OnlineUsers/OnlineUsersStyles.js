import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({

  /* ADdUser Modal Styles */
  modalBox: {
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
      height: "50vh",
    },
    [theme.breakpoints.down("xs")]: {
      width: "80vw",
      height: "50vh",
    },
    overflow : 'auto',
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    width: "40vw",
    overflow : 'auto',
    height: "40vh",
    backgroundColor: "#0C2340",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    color: "#FEFEFE",
    padding: theme.spacing(2, 4, 3),
  },
  white: {
    color: "#FEFEFE",
  },

  header : {
    textDecoration : "underline",
    marginBottom : '10px',
  },
  closeIcon: {
    color: "#FEFFFE",
    position: "absolute",
    right: 0,
    top: 0,
  },

  /* End Of AddUser Modal Styles */
}));




/* Modal positioning, center of screen */
export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
