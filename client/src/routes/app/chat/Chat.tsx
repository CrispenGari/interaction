import React from "react";

import { useParams } from "react-router-dom";
import { GlobalContext } from "../../../state/GlobalState";
import "./Chat.css";
import { BiMailSend } from "react-icons/bi";
import { Socket } from "socket.io-client";
import Message from "../../../components/Message/Message";
import { Header, ProfileCard } from "../../../components";
import { useAppUserQuery } from "../../../generated/graphql";
const Chat: React.FC = () => {
  const { socket, user } = React.useContext(GlobalContext);
  const { data: appUser } = useAppUserQuery({
    fetchPolicy: "network-only",
  });
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
    window?.document?.querySelector("p#chat__bottom")?.scrollIntoView({
      behavior: "smooth",
    });
    setMsg("");
  };
  io.on("receive-new-message", (data) => {
    setMessages(data);
  });

  return (
    <div className="chat">
      <Header />
      <div className="chat__container">
        <div className="chat__center">
          <div className="chat__center__header">
            <h1>private chat</h1>
            <p>{`you & ${
              messages?.users?.find((u: any) => u.uid !== user?.uid)?.username
            }`}</p>
          </div>

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
            <button type="submit">
              <BiMailSend className="button__icon" />
            </button>
          </form>
          <p id="chat__bottom"></p>
        </div>
        <div className="chat__right">
          <h1>you</h1>
          <ProfileCard user={appUser?.user.user} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
