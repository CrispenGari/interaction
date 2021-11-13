import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "./app";
import { Login, Register } from "./auth";
const R: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Routes>
    </Router>
  );
};

export default R;
