import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    border: "1px solid black",
    flexDirection: "column",
    width: "50%",
    margin: "20px auto",
  },
  /* AVATAR AND IMAGE UPLOAD BTN START */
  imageContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "10rem",
    height: "10rem",
    marginRight: "10px",
    objectFit: "contain",
  },
  /* AVATAR AND IMAGE UPLOAD BTN END  */
}));
