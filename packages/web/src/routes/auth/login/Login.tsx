import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const login = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button>login</button>
        <Link to="/register">register</Link>
      </form>
    </div>
  );
};

export default Login;
