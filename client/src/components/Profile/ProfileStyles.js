import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: "flex",
    border: "2px solid #062040",
    borderRadius: "4px",
    flexDirection: "column",
    width: "50%",
    margin: "20px auto",
    padding: "10px",
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
