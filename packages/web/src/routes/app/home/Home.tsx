import React from "react";
import { useNavigate } from "react-router";
import AuthCard from "../../../components/AuthCard";
import "./Home.sass";
import {
  useUserQuery,
  useLogoutMutation,
  UserDocument,
  UserQuery,
} from "../../../generated/graphql";
const Home: React.FC = () => {
  const { data } = useUserQuery({ fetchPolicy: "network-only" });
  const navigate = useNavigate();
  const [logoutHandler] = useLogoutMutation({ fetchPolicy: "network-only" });
  const logout = async () => {
    await logoutHandler({
      update: async (cache, { data }) => {
        if (!data) return null;
        await cache.writeQuery<UserQuery>({
          query: UserDocument,
          data: data.logout as any,
        });
      },
    });
    await navigate("/");
  };
  console.log(data?.user?.user);
  if (!(data as any)?.user?.user) {
    return (
      <div className="home">
        <div className="home__container">
          <AuthCard />
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <button onClick={logout}>logout</button>
      <h1>Home</h1>
    </div>
  );
};

export default Home;
