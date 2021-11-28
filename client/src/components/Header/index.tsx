import React from "react";
import "./Header.css";
import { AiFillWechat } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  useLogoutMutation
} from "../../generated/graphql";
const Header = () => {
  const navigate = useNavigate();

  const [logoutHandler] = useLogoutMutation({ fetchPolicy: "network-only" });
  const logout = async () => {
    await logoutHandler();
    await navigate("/login");
  };
  return (
    <div className="header">
      <h1 onClick={() => navigate("/")}>
        <AiFillWechat />
        chats
      </h1>
      <h1 title="logout" onClick={() => logout()}>
        <BiLogOutCircle />
      </h1>
    </div>
  );
};

export default Header;
