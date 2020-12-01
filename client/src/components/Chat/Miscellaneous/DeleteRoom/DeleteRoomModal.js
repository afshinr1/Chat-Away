import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import {
  useStyles,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "./DeleteStyles";
import { socket } from "../../../Utilities/API";
 import { toast, Slide } from "react-toastify";
 import { history } from "../../../Utilities/History";
import {
  Accordion,
  AccordionSummary,
  Divider,
  FormControlLabel,
} from "@material-ui/core";

export default function DeleteRoomModal({
  deleteDialogOpen,
  handleModalClose,
  roomObj,
  username,
}) {
  const classes = useStyles();
  const [acknowledged, setAcknowledged] = useState(false);

    /* TODO IN SERVER/CLIENT */
    const handleDeleteRoom = e => {
        e.preventDefault();
        socket.emit('delete room', roomObj, response => {
             toast.success(response, {
                 transition : Slide
             })
                 history.goBack();
        })
    }

  return (
    <div>
      <Dialog
        className={classes.container}
        onClose={handleModalClose}
        open={deleteDialogOpen}
      >
        <DialogTitle className={classes.title} onClose={handleModalClose}>
          <Typography className={classes.white}>DELETE ROOM</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Accordion className={classes.accordian}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon className={classes.white} />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <FormControlLabel
                aria-label="Acknowledge"
                onClick={(event) => event.stopPropagation()}
                onFocus={(event) => event.stopPropagation()}
                control={<Checkbox className={classes.white} />}
                checked={acknowledged}
                onChange={(e) => {
                  setAcknowledged((prevAck) => !prevAck);
                }}
                className={classes.white}
                label="I acknowledge deleting this room"
              />
            </AccordionSummary>
            <AccordionDetails>
              <Typography className={classes.white} gutterBottom>
                By deleting this room, you acknowledge that any member joined to
                to this room will not have access anymore, including
                administrators.
              </Typography>
            </AccordionDetails>
          </Accordion>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            color="inherit"
            variant="contained"
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            disabled={acknowledged ? false : true}
            className={classes.deleteBtn}
            onClick={handleDeleteRoom}
            variant="contained"
          >
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
