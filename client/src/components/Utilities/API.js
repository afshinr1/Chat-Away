import io from "socket.io-client";

const ENDPOINT = 'http://localhost:5000';

/* Socket for communication */
export const socket = io(ENDPOINT);

/* REST API URLS for authorization */
export const API = {
    SIGNIN : ENDPOINT + "/auth/signin",
    REGISTER : ENDPOINT + "/auth/register",

};