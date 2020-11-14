import { makeStyles } from "@material-ui/core/styles";
import { blue, green, red } from "@material-ui/core/colors";

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
    backgroundColor: blue[500],
  },
  iconBtn : {
    color : green[500],
    transform : 'scale(1.1)'
  },
  iconBtnErr : {
    color : red[500],
    transform : 'scale(1.1)'

  }
  /* Homepage Room column styles END */


}));