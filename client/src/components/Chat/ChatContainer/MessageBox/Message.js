import { Avatar, Typography } from "@material-ui/core";
import React from "react";
import "./MessageStyles.css";

/* MESSAGE COMPONENT */
function Message({ message, username }) {
  const date = convertToLocal(message.date);

  let trimmedName = username.toLowerCase().trim();
  /* IF MESSAGE IS SENT BY USER, APPLY THESE STYLES */
  if (message.username === trimmedName) {
    return (
      <>
        <div className="user-info justifyEnd pr-10">
          <Avatar src={`${message.profilePic}`} alt="" />
          {/* USER USERNAME */}
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>

          {/* DATE */}
          <Typography variant="caption"> {date}</Typography>
        </div>

        <div className="messageContainer pr-10 justifyEnd">
          {/* MESSAGE IS A TEXT (i.e not a picture) */}
          {message.type === "text" ? (
            <div className={`messageBox backgroundBlue `}>
              <Typography
                variant="body2"
                className="messageText"
                style={{ color: `#FFFFFF` }}
              >
                <b> {message.text}</b>
              </Typography>
            </div>
          ) : (
            /* MESSAGE IS A PICTURE */
            <img className="message_img" src={`${message.text}`} alt="" />
          )}
        </div>
      </>
    );
  } else {
    /* IF MESSAGE BY OTHER USERS, APPLY THESE */
    return (
      <>
        <div className="user-info pl-10">
          <Avatar src={`${message.profilePic}`} alt="" />

          {/* USER USERNAME */}
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>

          {/* DATE */}
          <Typography variant="caption">{date}</Typography>
        </div>

        <div className="messageContainer justifyStart pl-10">
          {/* MESSAGE IS A TEXT (i.e not a picture) */}
          {message.type === "text" ? (
            <div className="messageBox backgroundLight">
              <Typography
                variant="body2"
                className="messageText colorDark"
                style={{ color: `#${message.color}` }}
              >
                {message.text}
              </Typography>
            </div>
          ) : (
            /* MESSAGE IS A PICTURE */
            <img className="message_img" src={`${message.text}`} alt="" />
          )}
        </div>
      </>
    );
  }
}

/* HELPER FUNCTIONS */
function convertToLocal(serverDate) {
  const date = new Date(serverDate);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = (hours == 0 ? 12 : hours);
  minutes = minutes < 10 ? '0'+minutes : minutes;
  const strDate = hours + ':' + minutes + ' ' + ampm;

  return strDate;
}

export default Message;
