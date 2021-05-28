import React, { createContext, useReducer, useState } from "react";
import api from "./api";

export const AuthContext = createContext({
  logged: false,
  //userId: null,
  register: () => {},
  login: () => {},
  logout: () => {},
});
//console.log(logged);


const token = localStorage.getItem('token');


const initialState = {
  logged: token !== null,
  //userId: token ? getUserIdFromToken(token) : null,
};
//console.log(logged);
const reducer = (state, action) => {
  switch(action.type) {
    case 'login':
      return {
        ...state,
        logged: true,
        //userId: getUserIdFromToken(action.token),
      };
    case 'logout':
      return {
        ...state,
        logged: false,
        //userId: null,
      };
    case 'register':
      return {
        ...state,
        logged: true,
        //userId: getUserIdFromToken(action.token),
      };
  };
};

function AuthProvider({ children }) {
  const [token, setToken] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const [email, setEmail] = useState(null);
  //console.log(email);


  const register = async ({ email, password }) => {
    await api.register({ email, password })
    .then((token) => {
      dispatch({ type: 'register', token });
      localStorage.setItem('token', JSON.stringify(token));
      setEmail(email);
    })
    .catch((error) => {
      dispatch({ type: 'logout'});
      Promise.reject(error);
    })
  }

  const login = async ({ email, password }) => {
    await api.login( email, password )
    .then((token) => {
      dispatch({ type: 'login', token});
      localStorage.setItem('token', JSON.stringify(token));
      setToken(JSON.stringify(token));
      setEmail(email);
    })
    .catch((error) => {
      dispatch({ type: 'logout'});
      Promise.reject(error);
    })
  };

  const logout = () => {
    dispatch({ type: 'logout' });
    localStorage.removeItem('token');
    setEmail("");
  };

  return (
    <AuthContext.Provider value={{ ...state, token, email, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
