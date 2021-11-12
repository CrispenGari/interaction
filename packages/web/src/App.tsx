import React from "react";
import "./App.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { GlobalContext } from "./state/GlobalState";
import { io, Socket } from "socket.io-client";

// type SocketType = Socket<DefaultEventsMap, DefaultEventsMap>;

const App: React.FC<{}> = () => {
  const { socket, socketDispatch } = React.useContext(GlobalContext);
  // const [socket, setSocket] = React.useState<SocketType>();
  React.useEffect(() => {
    const client = io("http://localhost:3001/");
    socketDispatch();
    return () => {
      client.close();
    };
  }, []);

  console.log(socket);

  return (
    <div className="app">
      <Header />
      <div className="app__main">
        <h1>
          Welcome to the <span>React</span>, <span>TypeScript</span>,{" "}
          <span>Sass</span>
          <span>Scss</span> and <span>Css</span>boiler plate.
        </h1>
        <p>
          Open <span>App.tsx</span> and start writing some code
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default App;
