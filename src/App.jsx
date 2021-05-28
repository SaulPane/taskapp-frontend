import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import HomePage from "./pages/home-page";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import TaskPage from "./pages/task-page";
import UserPage from "./pages/user-page";
import NavBar from "./components/NavBar";
import AuthProvider from "./utils/auth-provider";
import PrivateRoute from "./utils/private-route";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div>
          <NavBar />
          <hr />
          <Switch>
            <PrivateRoute path="/task">
              <TaskPage />
            </PrivateRoute>
            <PrivateRoute path="/profile">
              <UserPage />
            </PrivateRoute>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/register">
              <RegisterPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
