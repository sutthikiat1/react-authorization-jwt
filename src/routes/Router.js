import React from "react";
import { Switch } from "react-router-dom";
import styled from "styled-components";
import Nav from "../components/Nav";
import Courses from "../components/Courses";
import Blog from "../components/Blog";
import Resources from "../components/Resources";
import PremiumCourses from "../components/PremiumCourses";
import Admin from "../components/Admin";
import Login from "../components/Login";
import NotFound from "../components/NotFound";
import PublicRoutes from "./PublicRoutes";
import PremiumRoute from "./PremiumRoute";
import AdminRoute from "./AdminRoute";

const Div = styled.div`
  margin: 0 auto;
  padding: 0 auto;
`;

const Page = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

function Router() {
  return (
    <Div>
      <Nav />
      <Page>
        <Switch>
          <PublicRoutes exact path="/">
            <Courses />
          </PublicRoutes>
          <PublicRoutes path="/blog">
            <Blog />
          </PublicRoutes>
          <PublicRoutes path="/resources">
            <Resources />
          </PublicRoutes>

          <PremiumRoute path="/premium-courses">
            <PremiumCourses />
          </PremiumRoute>

          <AdminRoute path="/admin">
            <Admin />
          </AdminRoute>

          <PublicRoutes path="/login">
            <Login />
          </PublicRoutes>

          <PublicRoutes>
            <NotFound />
          </PublicRoutes>
        </Switch>
      </Page>
    </Div>
  );
}

export default Router;
