import React from "react";
import "./ProfileCard.css";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../generated/graphql";

interface Props {
  user: any;
}
const ProfileCard: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const [logoutHandler] = useLogoutMutation({ fetchPolicy: "network-only" });
  const logout = async () => {
    await logoutHandler();
    await navigate("/login");
  };
  return (
    <div className="profile__card">
      <div className="profile__card__avatar">{user?.username?.slice(0, 1)}</div>
      <div className="profile__card__info">
        <h1>{user?.username}</h1>
        <p>{user?.gender}</p>
      </div>
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default ProfileCard;
