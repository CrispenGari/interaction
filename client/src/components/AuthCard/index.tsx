import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthCard.css";
const AuthCard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="auth__card">
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
  );
};

export default AuthCard;
