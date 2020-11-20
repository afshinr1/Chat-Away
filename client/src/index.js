import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

/* START REDUX NECESSITIES */
import thunk from "redux-thunk";
import { combineReducers, applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { AuthReducer } from "./reducers/AuthReducer";
import { MyRoomsReducer} from './reducers/MyRoomsReducer';
import {RequestsReducer} from './reducers/RequestsReducer';

const rootReducer = combineReducers({
  AuthReducer: AuthReducer,
  MyRoomsReducer : MyRoomsReducer,
  RequestsReducer : RequestsReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
/* END REDUX NECESSITIES */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
