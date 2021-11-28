import React from "react";
import "./Message.css";
interface MessageProps {
  message: any;
  user: any;
  meId: string;
}
const Message: React.FC<MessageProps> = ({ message, user, meId }) => {
  console.log(user, message);
  return (
    <div className={`message ${meId === user.uid ? "message--me" : ""}`}>
      <div className="message__avatar">
        {meId === user.uid
          ? "me"
          : String(user?.username).slice(0, 2).toLowerCase()}
      </div>
      <p className="message__text">{message.text}</p>
      <div className="message__bottom">
        <p>{user.username}</p>
        <p>time</p>
      </div>
    </div>
  );
};

export default Message;
