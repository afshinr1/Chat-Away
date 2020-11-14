const initialState = { roomList : [] }

/* Used fpr setting and adding a joined room */
export const MyRoomsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_MYROOMS":
            return {
                ...state,
                roomList : [...action.payload]
            }
        case "ADD_ROOM":
            return {
                ...state,
                roomList : [action.payload, ...state.roomList]
            }

        default:
            return state;
    
        }
}