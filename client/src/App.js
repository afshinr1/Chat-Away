import React, { useState } from "react";
import "./App.css";
import { Redirect, Route, Switch, Router } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import { history } from "./components/Utilities/History";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const user = sessionStorage.getItem("user");

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          {/*If user is logged in, redirect to app, else redirect to login*/}
          <Route exact path="/">
            {loggedIn || user ? <Redirect to="/app" /> : <Redirect to="/login" />}
          </Route>

          {/*Register Route, render register component*/}
          <Route path="/Register">
            <Register />
          </Route>

          {/*Login Route, render login component*/}
          <Route path="/login">
            <Login handleLogin={handleLogin} />
          </Route>

          {/*Main app route, render home components*/}
          <Route path="/app">
            <Home />
          </Route>
        </Switch>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
