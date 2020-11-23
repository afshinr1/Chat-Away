const initialState = { friendList: [] };

/* Used for setting and adding friends */
export const MyFriendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FRIENDS":
      return {
        ...state,
        friendList: [...action.payload],
      };
    case "ADD_FRIEND":
      return {
        ...state,
        friendList: [action.payload, ...state.friendList],
      };
    case "REMOVE_FRIEND":
      const updatedFriendList = [...state.friendList].filter(x => x.id !== action.payload.id);
      return {
        ...state,
        friendList: updatedFriendList
      };

    default:
      return state;
  }
};
