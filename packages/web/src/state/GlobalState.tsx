import React, { createContext, useReducer } from "react";
import { socketReducer, userReducer } from "./reducers";

export const GlobalContext = createContext<any>({});
export const GlobalState: React.FC<{ children: any }> = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, null);
  const [socket, setSocket] = useReducer(socketReducer, null);
  return (
    <GlobalContext.Provider
      value={{
        userDispatch,
        user,
        socket,
        setSocket,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
