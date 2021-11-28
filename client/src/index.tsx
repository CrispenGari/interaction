import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GlobalState } from "./state/GlobalState";
import { ApolloGraphQLProvider } from "./providers/ApolloGraphQLProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloGraphQLProvider>
      <GlobalState>
        <App />
      </GlobalState>
    </ApolloGraphQLProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
