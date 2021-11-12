import { constants } from "../../constants";
import { ActionType } from "../../types";

export const socketReducer = (state = null, action: ActionType) => {
  switch (action.type) {
    case constants.SET_SOCKET:
      return (state = action.payload);
    default:
      return state;
  }
};
