import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AiFillWechat } from "react-icons/ai";

import {
  useLoginMutation,
  UserDocument,
  UserQuery,
  useUserQuery,
} from "../../../generated/graphql";
import { ActivityIndicator } from "../../../components";
const Login: React.FC = () => {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const checkBoxRef = React.useRef<
    React.LegacyRef<HTMLInputElement> | undefined | any
  >();
  const [showPassword, setShowPassword] = React.useState<any>();
  const navigate = useNavigate();
  const [loginHandler, { loading, data: loginData }] = useLoginMutation({
    fetchPolicy: "network-only",
  });
  const { data, loading: loadingUser } = useUserQuery({
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (loadingUser === false && mounted) {
      if (data?.user.user) {
        navigate("/");
      }
    }
    return () => {
      mounted = false;
    };
  }, [data, navigate, loadingUser]);

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("........");
    console.log(loginData?.login?.user);
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

    console.log(loginData?.login.user);
    if (loginData?.login.user) {
      console.log("authenticating");
      await navigate("/");
    }
  };

  return (
    <div className="login">
      <div className="login__app">
        <div className="login__left">
          <h1>
            <AiFillWechat className="login__left__icon" />
            interaction
          </h1>
          <p>chat with people around the world using interaction.</p>
        </div>
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
            type={showPassword ? "text" : "password"}
            placeholder="password"
          />
          <label htmlFor="show__password">
            <input
              onChange={(e) => setShowPassword(e.target.checked)}
              ref={checkBoxRef}
              value={showPassword}
              id="show__password"
              type="checkbox"
            />
            <p>{showPassword ? "hide password" : "show password"}</p>
          </label>
          {loginData?.login.error && (
            <p className="login__error">{loginData.login.error.message}</p>
          )}
          {loading && <ActivityIndicator />}
          <button type="submit">login</button>
          <Link to="/register">register</Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
