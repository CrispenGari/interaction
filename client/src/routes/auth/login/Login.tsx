import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import {
  useLoginMutation,
  UserDocument,
  UserQuery,
  useUserQuery,
} from "../../../generated/graphql";
const Login: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
  const [loginHandler] = useLoginMutation({ fetchPolicy: "network-only" });
  const { data } = useUserQuery({ fetchPolicy: "network-only" });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && (data as any)?.user?.user) {
      navigate("/");
    }
    return () => {
      mounted = false;
    };
  }, [data, navigate]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await loginHandler({
      variables: {
        input: {
          username,
          password,
        },
      },
      update: async (cache, { data }) => {
        if (!data) return null;
        await cache.writeQuery<UserQuery>({
          query: UserDocument,
          data: data.login.user as any,
        });
      },
    });
    await navigate("/");
  };
  return (
    <div className="login">
      <form onSubmit={login}>
        <h1>Login</h1>
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
        <button type="submit">login</button>
        <Link to="/register">register</Link>
      </form>
    </div>
  );
};

export default Login;
