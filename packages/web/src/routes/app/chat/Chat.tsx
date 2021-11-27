import React from "react";

import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../state/GlobalState";
import "./Chat.css";
import { Socket } from "socket.io-client";
import Message from "../../../components/Message/Message";

const Chat: React.FC = () => {
  const { socket, user } = React.useContext(GlobalContext);
  console.log(socket, user);
  const params = useParams();
  const [msg, setMsg] = React.useState<string>("");
  const [messages, setMessages] = React.useState<any>();

  const io: Socket = socket;
  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && io) {
      io.emit("join-room", params.chatId);
    }
    return () => {
      mounted = false;
    };
  }, [io, params]);
  const sendMessage = () => {
    if (msg === "") return;
    io.emit("send-new-message", {
      user,
      message: msg,
      chatId: params.chatId,
    });
  };
  io.on("receive-new-message", (data) => {
    setMessages(data);
  });

  console.log(messages);
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat__left">
          <h1>left</h1>
        </div>
        <div className="chat__center">
          <h1>chats header</h1>

          <div className="chat__messages__container">
            {messages?.messages?.map((message: any) => {
              return (
                <Message
                  user={messages.users.find(
                    (u: any) => u.uid === message.senderId
                  )}
                  message={message}
                  meId={user.uid}
                />
              );
            })}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              type="text"
              placeholder="type a message"
            />
            <button type="submit">send</button>
          </form>
        </div>
        <div className="chat__right">
          <h1>chat right</h1>
        </div>
      </div>
    </div>
  );
};

export default Chat;
