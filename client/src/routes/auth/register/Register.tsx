import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useRegisterMutation,
  UserDocument,
  UserQuery,
  useUserQuery,
} from "../../../generated/graphql";
import "./Register.css";
import { AiFillWechat } from "react-icons/ai";
import { ActivityIndicator } from "../../../components";

const Register: React.FC = () => {
  const [gender, setGender] = React.useState<string>("male");
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const navigate = useNavigate();
  const [registerHandler, { data: registerData, loading }] =
    useRegisterMutation({
      fetchPolicy: "network-only",
    });
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

  const register = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await registerHandler({
      variables: {
        input: {
          gender,
          password,
          username,
        },
      },
      update: async (cache, { data }) => {
        if (!data) return null;
        await cache.writeQuery<UserQuery>({
          query: UserDocument,
          data: {
            user: data.register.user as any,
          },
        });
      },
    });

    if (registerData?.register.user) {
      await navigate("/");
    } else {
      setPassword("");
    }
  };

  return (
    <div className="register">
      <div className="register__app">
        <div className="register__left">
          <h1>
            <AiFillWechat className="login__left__icon" />
            interaction
          </h1>
          <p>chat with people around the world using interaction.</p>
        </div>
        <form onSubmit={register}>
          <h1>Register</h1>
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
          {registerData?.register.error ? (
            <p className="register__error">
              {registerData?.register.error?.message}
            </p>
          ) : null}
          {loading ? <ActivityIndicator /> : null}
          <button type="submit">register</button>
          <Link to="/login">login</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
