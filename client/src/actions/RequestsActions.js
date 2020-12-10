/** ROOM REQUESTS */

/* Set global state requests */
export const setRequests = (data) => {
  return { type: "SET_REQUESTS", payload: data };
}

/* Add a Request to global state requests */
export const addRequest = (request) => {
  return { type: "ADD_REQUEST", payload: request };
};

export const appendRequests = (requests) => {
  return { type: "ADD_MULTIPLE_REQUESTS", payload: requests };
};

/* remove a Request from global state requests */
export const removeRequest = (id) => {
  return { type: "REMOVE_REQUEST", payload: id };
};

/* Remove all requests from global state requests */
export const removeAllRequests = () => {
  return {type : "REMOVE_ALL_REQUESTS"};
}