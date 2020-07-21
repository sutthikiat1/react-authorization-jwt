import React, { createContext, useState } from "react";
import jwt from "jsonwebtoken";
import { authentication } from "../utils/fakeBackend";
export const AuthContext = createContext();

const callApiAuth = (token) => {
  // Call API Check TOKEN
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        token ===
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoibWVtYmVyIn0.9byD_B5uKrW6CTMI2q9uqHL6rx76iFBzHC6DtLOzClM" ||
        token ===
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiYWRtaW4ifQ.OINhRk6ZQWjVHSl8A_j8G-h7futKtqIEukNh5qLwu1E"
      ) {
        resolve("200");
      } else {
        resolve("401");
      }
    }, 200);
  });
};

export const AuthProvider = ({ children }) => {
  console.log("Provider");
  let token = localStorage.getItem("token");
  var decode = jwt.decode(token);
  const [auth, setAuth] = useState(decode ? decode.role : null);
  const [userName, setUserName] = useState(decode ? decode.name : null);

  const verifyToken = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      const resposne = await callApiAuth(token);
      if (resposne === "200") {
        console.log("-- Verify Route PASS --");
        let { role, name } = jwt.decode(token);
        setAuth(role);
        setUserName(name);
      } else {
        console.log("-- ERROR --");
        setAuth(null);
        localStorage.clear();
      }
    } else {
      setAuth(null);
      localStorage.clear();
    }
  };

  const login = (name, password) => {
    let authen = authentication(name, password);
    if (authen.success === true) {
      setAuth(authen.role);
      setUserName(authen.user);
      localStorage.setItem("token", authen.token);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider
      value={{ auth, userName, login, logout, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
