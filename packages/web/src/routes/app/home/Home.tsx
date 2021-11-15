import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../../../components/AuthCard";
import "./Home.sass";
import {
  useUserQuery,
  useLogoutMutation,
  UserDocument,
  UserQuery,
} from "../../../generated/graphql";
import { GlobalContext } from "../../../state/GlobalState";
import actions from "../../../state/actions";

const Home: React.FC = () => {
  const { data } = useUserQuery({ fetchPolicy: "network-only" });
  const navigate = useNavigate();
  const [logoutHandler] = useLogoutMutation({ fetchPolicy: "network-only" });
  const { userDispatch } = React.useContext(GlobalContext);
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

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      userDispatch(actions.setUser(data.user.user));
    }
    return () => {
      mounted = false;
    };
  }, [data, userDispatch]);

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
      <Link to="/chat/401ba250-95f6-4230-86c0-48388757e654-919de579-6097-44af-9620-27f198de2285">
        chat
      </Link>
    </div>
  );
};

export default Home;
