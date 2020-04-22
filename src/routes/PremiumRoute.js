import React, { useContext , useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthContext } from "../hooks/AuthProvider";

const PremiumRoute = ({ children }) => {
  const { auth , verifyToken } = useContext(AuthContext);

  useEffect(()=>{
    const callApi = async ()=>{
      await verifyToken();
    }
    callApi();
  },[verifyToken])

  return <Route>{auth && (auth === 'member' || auth === 'admin') ? children : <Redirect to='/login' />}</Route>
}

export default PremiumRoute
