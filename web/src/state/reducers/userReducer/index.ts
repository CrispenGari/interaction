import { constants } from "../../constants";
import { ActionType } from "../../types";

export const userReducer = (state = null, action: ActionType) => {
  switch (action.type) {
    case constants.SET_USER:
      return (state = action.payload);
    default:
      return state;
  }
};
