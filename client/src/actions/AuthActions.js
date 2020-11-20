
/* NOT USING CURRENTLY. USING SESSION STORAGE */

import axios from "axios";

const validateUser = (data) => {
  sessionStorage.setItem("user", JSON.stringify(user));

  return {
    type: "SET_USER",
    payload: { user: data },
  };
};

export const validateUserAsync = (username, password) => {};
