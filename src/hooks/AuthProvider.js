import React, { createContext, useState } from "react";
import jwt from "jsonwebtoken";
import { authentication } from "../utils/fakeBackend";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log('Provider')
    let token = localStorage.getItem('token');
    var decode = jwt.decode(token);
    const [auth, setAuth] = useState(decode ? decode.role : null);
    const [userName, setUserName] = useState(decode ? decode.name : null);
    
    const verifyToken = () => { // Call API Check TOKEN
        let token = localStorage.getItem('token');
        console.log('Verify Token')
        if (token) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoibWVtYmVyIn0.9byD_B5uKrW6CTMI2q9uqHL6rx76iFBzHC6DtLOzClM' || 
                    token === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoiYWRtaW4ifQ.OINhRk6ZQWjVHSl8A_j8G-h7futKtqIEukNh5qLwu1E') {
                        var decode = jwt.decode(token);
                        setAuth(decode.role);
                        setUserName(decode.name);
                        resolve();
                    } else {
                        localStorage.removeItem('token');
                        setAuth(null);
                        reject('token 401')
                    }
                }, 200)
            })
        } else {
            setAuth(null);
            setUserName(null);
            localStorage.clear();
        }
    }

    const login = (name, password) => {
        let authen = authentication(name, password)
        if (authen.success === true) {
            setAuth(authen.role);
            setUserName(authen.user);
            localStorage.setItem('token', authen.token)
        }
    }

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    return (
        <AuthContext.Provider value={{ auth, userName , login, logout, verifyToken }}>
            {children}
        </AuthContext.Provider>
    );
};