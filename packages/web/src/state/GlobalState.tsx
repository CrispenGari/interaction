import React, { createContext, useReducer } from "react";
import { socketReducer, userReducer } from "./reducers";

export const GlobalContext = createContext<any>({});
export const GlobalState: React.FC<{ children: any }> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const [socket, socketDispatch] = useReducer(socketReducer, null);
  return (
    <GlobalContext.Provider
      value={{
        userDispatch,
        user,
        socket,
        socketDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
