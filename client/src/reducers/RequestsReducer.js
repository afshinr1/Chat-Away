const initialState = { requests : [] }

/* Used for setting/adding and removing invitation requests */
export const RequestsReducer = (state = initialState, action) => {

    switch (action.type) {
        case "ADD_REQUEST":
            return {
                ...state,
                requests : [action.payload, ...state.requests]
            }
        case "REMOVE_REQUEST":
            return {
                ...state,
                requests : state.requests.filter(request => request.requestId !== action.payload)
            }

        default:
            return state;
        }
}