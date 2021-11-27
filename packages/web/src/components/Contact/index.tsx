import React from "react";
interface Props {
  user: any;
}
const Contact: React.FC<Props> = ({ user }) => {
  const messageUser = () => {
    const { uid } = user;
  };
  return (
    <div className="contact" onClick={messageUser}>
      <div className="contact__avatar"></div>
      <div className="contact__right">
        <h1>{user.username}</h1>
        <p>{user.gender}</p>
      </div>
    </div>
  );
};
export default Contact;
