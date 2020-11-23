/* Set global state for friends */
export const setFriends = (friends) => {
    return { type: "SET_FRIENDS", payload: friends };
};

export const addFriend = (friend) => {
    return { type: "ADD_FRIEND", payload: friend };
};

export const removeFriend = (friend) => {
    return { type: "REMOVE_FRIEND", payload: friend }
}