import React from "react";
import "./App.css";
import { GlobalContext } from "./state/GlobalState";
import { io } from "socket.io-client";
import Routes from "./routes/Routes";
import { setAccessToken } from "./state";
import actions from "./state/actions";
// type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>;
const App: React.FC<{}> = () => {
  const { socketDispatch } = React.useContext(GlobalContext);
  // const [socket, setSocket] = React.useState<SocketType>();
  React.useEffect(() => {
    let mounted: boolean = true;
    const client = io("http://localhost:3001/");
    if (client && mounted) {
      socketDispatch(actions.setSocket(client));
    }
    return () => {
      mounted = false;
      client.close();
    };
  }, []);

  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:3001/refresh-token", {
      method: "POST",
      credentials: "include",
    })
      .then(async (res) => {
        const { accessToken } = await res.json();
        setAccessToken(accessToken);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <p>loading...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes />
    </div>
  );
};

export default App;
