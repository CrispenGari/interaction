import { constants } from "../constants";
const incrementCounter = (payload: number) => {
  return {
    payload,
    type: constants.INCREMENT,
  };
};
const decrementCounter = (payload: number) => {
  return {
    payload,
    type: constants.INCREMENT,
  };
};
const setUser = (payload: any) => {
  return {
    payload,
    type: constants.SET_USER,
  };
};
const setSocket = (payload: any) => {
  return {
    payload,
    type: constants.SET_SOCKET,
  };
};

const actions = {
  setUser,
  decrementCounter,
  incrementCounter,
  setSocket,
};

export default actions;
