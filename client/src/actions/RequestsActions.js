/* Add a Request to global state requests */
export const addRequest = (request) => {
  return { type: "ADD_REQUEST", payload: request };
};


/* remove a Request from global state requests */
export const removeRequest = (id) => {
  return { type: "REMOVE_REQUEST", payload: id };
};
