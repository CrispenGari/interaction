import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthCard.css";
import { AiFillWechat } from "react-icons/ai";

const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth__card">
      <div className="auth__card__app">
        <div className="auth__card__left">
          <h1>
            <AiFillWechat className="auth__card__left__icon" />
            interaction
          </h1>
          <p>chat with people around the world using interaction.</p>
        </div>
        <div>
          <h1>get authenticated in order to interact with your loved ones</h1>
          <button
            onClick={() => {
              navigate("/register", { replace: true });
            }}
          >
            register
          </button>
          <button
            onClick={() => {
              navigate("/login", { replace: true });
            }}
          >
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
