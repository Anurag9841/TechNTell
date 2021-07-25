import * as ActionTypes from "./ActionTypes";

export const UsersReducer = (
  state = {
    isLoading: false,
    errMess: null,
    users: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        errMess: "",
      };

    case ActionTypes.USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload,
      };

    case ActionTypes.USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errMess: action.errMess,
        users: [],
      };

    default:
      return state;

  }
};
