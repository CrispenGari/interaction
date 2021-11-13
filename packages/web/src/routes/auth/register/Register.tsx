import React from "react";
import { Link } from "react-router-dom";
const Register: React.FC = () => {
  const [gender, setGender] = React.useState<string>("male");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const register = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="register">
      <h1>Register</h1>
      <form onSubmit={register}>
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
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <button type="submit">register</button>
        <Link to="/login">login</Link>
      </form>
    </div>
  );
};

export default Register;
