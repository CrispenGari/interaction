import React from "react";
import { GlobalContext } from "../../state/GlobalState";
import "./Contact.css";
import { useCreateChatMutation } from "../../generated/graphql";
import { useNavigate } from "react-router-dom";
interface Props {
  user: any;
  isContact: boolean;
}
const Contact: React.FC<Props> = ({ isContact, user }) => {
  const { user: me } = React.useContext(GlobalContext);

  const [createChat] = useCreateChatMutation({
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();
  const messageUser = async () => {
    const { uid } = user;

    if (!isContact && me?.uid) {
      await createChat({
        variables: {
          input: {
            uid: me?.uid,
            friendId: uid,
          },
        },
      });
    }
    const chatId: string = [me?.uid.trim(), uid?.trim()]
      .sort((a: string, b: string) => a.localeCompare(b))
      .join("-");

    if (me?.uid) {
      await navigate(`/chat/${chatId}`);
    }
  };
  return (
    <div className="contact" onClick={messageUser}>
      <div className="contact__avatar">{user.username.slice(0, 1)}</div>
      <div className="contact__right">
        <h1>{user.username}</h1>
        <p>{user.gender}</p>
      </div>
    </div>
  );
};
export default Contact;
