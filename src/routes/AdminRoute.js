import React, { useContext , useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { AuthContext } from "../hooks/AuthProvider";

const AdminRoute = ({ children }) => {
  const { auth , verifyToken } = useContext(AuthContext);

  useEffect(()=>{
    const callApi = async ()=>{
      await verifyToken();
    }
    callApi();
  },[verifyToken])

  return (
    <Route>
      {auth && auth === 'admin' ? children : <Redirect to='/login' />}
    </Route>
  )
}

export default AdminRoute
