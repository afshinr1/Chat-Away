import { Typography } from "@material-ui/core";
import React from "react";
import "./MessageStyles.css";

/* MESSAGE COMPONENT */
function Message({ message, username }) {
  let trimmedName = username.toLowerCase().trim();

  /* IF MESSAGE IS SENT BY USER, APPLY THESE STYLES */
  if (message.username === trimmedName) {
    return (
      <>
        <div className="user-info justifyEnd pr-10">
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>
          <Typography variant="caption"> {message.date}</Typography>
        </div>
        <div className="messageContainer pr-10 justifyEnd">
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
            <img className="message_img" src={`${message.text}`} alt="" />
          )}
        </div>
      </>
    );
  } 
  /* IF MESSAGE BY OTHER USERS, APPLY THESE */
  else {
    return (
      <>
        <div className="user-info pl-10">
          <Typography variant="body2" className="sentText pl-10">
            {message.username} :
          </Typography>
          <Typography variant="caption">{message.date}</Typography>
        </div>
        <div className="messageContainer justifyStart pl-10">
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
            <img className="message_img" src={`${message.text}`} alt="" />
          )}
        </div>
      </>
    );
  }
}

export default Message;
