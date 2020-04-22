import React from 'react'
import { Route } from 'react-router-dom'

const PublicRoutes = ({ children }) => {
  return <Route>{children}</Route>
}

export default PublicRoutes
