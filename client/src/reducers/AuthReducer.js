const initialState = { user: null };

/* NOT USED CURRENTLY */
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};
