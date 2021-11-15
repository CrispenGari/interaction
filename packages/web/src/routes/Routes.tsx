import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Chat, Home } from "./app";
import { Login, Register } from "./auth";
const R: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" caseSensitive={false} element={<Login />} />
        <Route path="/register" caseSensitive={false} element={<Register />} />
        <Route path="/chat/:chatId" element={<Chat />} />
        <Route path="/" caseSensitive={false} element={<Home />} />
      </Routes>
    </Router>
  );
};

export default R;
