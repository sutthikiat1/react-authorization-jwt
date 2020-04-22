import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../hooks/AuthProvider";

const Head = styled.header`
  width: 100%;
  height: 50px;
  background: teal;
  color: white;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;

  .navigation {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
      text-decoration: none;
      list-style: none;
      color: white;
      transition: all 0.35s linear;
    }

    .active {
      text-decoration: underline;
    }
  }
`;

const Nav = () => {
  const { auth, userName, logout } = useContext(AuthContext);
  const history = useHistory();
  return (
    <Head>
      <ul className="navigation">
        <NavLink to="/" exact activeClassName="active">
          <li>free courses</li>
        </NavLink>
        <NavLink to="/blog" activeClassName="active">
          <li>blog</li>
        </NavLink>
        <NavLink to="/resources" activeClassName="active">
          <li>resources</li>
        </NavLink>

        {auth && (auth === 'member' || auth === 'admin') && (
          <NavLink to="/premium-courses" activeClassName="active">
            <li>premium courses</li>
          </NavLink>
        )}

        {auth && auth === "admin" && (
          <NavLink to="/admin" activeClassName="active">
            <li>admin</li>
          </NavLink>
        )}

        {auth ? (
          <React.Fragment>
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                logout();
                history.push("/");
              }}
            >
              logout
          </p>
            <p>
              | {userName}
            </p>
          </React.Fragment>
        ) : (
            <NavLink to="/login" activeClassName="active">
              <li>login</li>
            </NavLink>
          )}
      </ul>
    </Head>
  );
};

export default Nav;
