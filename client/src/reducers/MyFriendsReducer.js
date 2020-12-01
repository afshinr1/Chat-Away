const initialState = { friends: [] };

/* Used for setting and adding friends */
export const MyFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        ...state,
        friends: action.payload === null ? [] : [...action.payload]
      };
    case "ADD_FRIEND":
      return {
        ...state,
        friends: [action.payload, ...state.friends],
      };
    case "REMOVE_FRIEND":
      const updatedFriendList = [...state.friends].filter(x => x.id !== action.payload.id);
      return {
        ...state,
        friends: updatedFriendList
      };

    default:
      return state;
  }
};
