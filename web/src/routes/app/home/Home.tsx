import React from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../../../components/AuthCard";
import "./Home.sass";
import {
  useUserQuery,
  useLogoutMutation,
  UserDocument,
  UserQuery,
  useAppUserQuery,
  useAllUsersQuery,
} from "../../../generated/graphql";
import { GlobalContext } from "../../../state/GlobalState";
import actions from "../../../state/actions";
import { Contact, Header } from "../../../components";
const Home: React.FC = () => {
  const { data } = useUserQuery({ fetchPolicy: "network-only" });
  const navigate = useNavigate();
  const [logoutHandler] = useLogoutMutation({ fetchPolicy: "network-only" });
  const { userDispatch } = React.useContext(GlobalContext);

  const { data: appUser, loading: appUserLoading } = useAppUserQuery({
    fetchPolicy: "network-only",
  });

  const { data: users, loading: allUsersLoading } = useAllUsersQuery({
    fetchPolicy: "network-only",
  });

  console.log(users, allUsersLoading);
  console.log(appUser, appUserLoading);
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
      <Header />
      <div className="home__app">
        <div className="home__left">
          <h1>all users</h1>
          <div className="home__left__users">
            {users?.users
              ?.filter((user) => user.username !== user.username)
              .map((user) => {
                return <Contact user={user} key={user.username} />;
              })}
          </div>
        </div>
        <div className="home__center">
          <h1>recent chat</h1>
          <div className="home__contacts"></div>
        </div>
        <div className="home__right">
          <h1>profile</h1>
        </div>
      </div>
      <button onClick={logout}>logout</button>
      <h1>Home</h1>
      <Link to="/chat/401ba250-95f6-4230-86c0-48388757e654-919de579-6097-44af-9620-27f198de2285">
        chat
      </Link>
    </div>
  );
};

export default Home;
