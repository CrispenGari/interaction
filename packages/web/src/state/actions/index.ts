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
    type: constants.INCREMENT,
  };
};

const actions = {
  setUser,
  decrementCounter,
  incrementCounter,
};

export default actions;
