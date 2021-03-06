import React, { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";

import AuthContext from "./context/AuthContext";

import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";

import Navigation from "./components/Navigation";

function App() {
  const [auth, setAuth] = useState({
    token: null,
    userId: null
  });

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.token && auth?.userId) {
      setAuth(auth);
    }
  }, []);

  useEffect(() => {
    if (auth.userId && auth.token) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  const login = (token, userId, expiresIn) => {
    setAuth({
      token,
      userId
    });
  };

  const logout = () => {
    setAuth({
      token: null,
      userId: null
    });
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{ token: auth.token, userId: auth.userId, login, logout }}
      >
        <Navigation />
        <main>
          <Switch>
            {auth.token && <Redirect from="/" to="/events" exact />}
            {auth.token && <Redirect from="/auth" to="/events" exact />}
            {!auth.token && <Route path="/auth" component={AuthPage} />}
            <Route path="/events" component={EventsPage} />
            {auth.token && <Route path="/bookings" component={BookingsPage} />}
            {!auth.token && <Redirect to="/auth" exact />}
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
