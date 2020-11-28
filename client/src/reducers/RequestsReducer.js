const initialState = { requests: [] };

/* Used for setting/adding and removing invitation requests */
export const RequestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_REQUESTS":
      return {
        ...state,
        requests: [...action.payload]
      };

      case "ADD_MULTIPLE_REQUESTS":
        return{
          ...state,
          requests: [...action.payload, ...state.requests]
        }
    
    case "ADD_REQUEST":
      const requestId = action.payload.requestId;
      const idList = state.requests.map((req) => req.requestId);
      if (!idList.includes(requestId)) {
        return {
          ...state,
          requests: [action.payload, ...state.requests],
        };
      } else {
        return {
          ...state,
        };
      }

    case "REMOVE_REQUEST":
      return {
        ...state,
        requests: state.requests.filter(
          (request) => request.requestId !== action.payload
        ),
      };

    default:
      return state;
  }
};
