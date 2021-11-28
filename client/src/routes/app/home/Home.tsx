import React from "react";
import AuthCard from "../../../components/AuthCard";
import "./Home.css";
import {
  useUserQuery,
  useAppUserQuery,
  useAllUsersQuery,
} from "../../../generated/graphql";
import { GlobalContext } from "../../../state/GlobalState";
import actions from "../../../state/actions";
import { Contact, Header, ProfileCard } from "../../../components";
const Home: React.FC = () => {
  const { data } = useUserQuery({ fetchPolicy: "network-only" });
  const { userDispatch } = React.useContext(GlobalContext);
  const [users, setUsers] = React.useState<any[]>([]);
  const [usernameFilter, setUsernameFilter] = React.useState<string>("");
  const { data: appUser } = useAppUserQuery({
    fetchPolicy: "network-only",
  });

  const { data: _users } = useAllUsersQuery({
    fetchPolicy: "network-only",
  });

  React.useEffect(() => {
    let mounted: boolean = true;
    if (mounted && data) {
      userDispatch(actions.setUser(data.user.user));
    }
    return () => {
      mounted = false;
    };
  }, [data, userDispatch]);

  React.useEffect(() => {
    const filtered = _users?.users
      .filter((u) => u?.uid !== data?.user.user?.uid)
      .filter((u_) =>
        u_.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
    setUsers(filtered as any);
  }, [_users, usernameFilter, data]);

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
        <div className="home__center">
          <div className="home__center__header">
            <h1>chats</h1>
            <div className="home__center__search">
              <input
                type="text"
                placeholder="filter chats..."
                value={usernameFilter}
                onChange={(e) => setUsernameFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="home__contacts">
            {users?.map((user) => {
              return (
                <Contact
                  isContact={Boolean(
                    (appUser?.user?.user as any)?.chats.find((chat: any) =>
                      chat.chatId?.includes(user.uid)
                    )
                  )}
                  user={user}
                  key={user.username}
                />
              );
            })}
          </div>
        </div>
        <div className="home__right">
          <h1>you</h1>
          <ProfileCard user={appUser?.user.user} />
        </div>
      </div>
    </div>
  );
};

export default Home;
