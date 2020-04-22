import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import { AuthContext } from "../hooks/AuthProvider";

const FormDiv = styled.div`
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  width: 60%;
  padding: 1rem 0;
  border-radius: 4px;

  form {
    width: 50%;
    .input {
      width: 100%;
      padding: 10px;
      border: 1px solid teal;
      border-radius: 4px;
      font-size: 1rem;
      height: 2rem;
      margin-top: 1.5rem;

      &:focus {
        outline: none;
      }
    }

    .bttn {
      width: 40%;
      height: 2.5rem;
      padding: 5px auto;
      margin-top: 2rem;
      font-size: 1.2rem;
      background: teal;
      border: none;
      color: white;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: green;
      }
    }
  }

  .login {
    margin-top: 3rem;
    margin-left: 1rem;
    justify-content: center;
    align-items: center;
    background: white;
    width: 50%;
    padding: 1rem;
    border: 1px solid teal;
    border-radius: 4px;
  }
`;

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const { login, auth } = useContext(AuthContext);
  const history = useHistory();

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  useEffect(() => { //Fix ตรงนี้ถ้าอยากำหนดหน้าเริ่มต้นหลังจาก Login 
    if (auth && auth === "member") {
      history.push("/premium-courses");
    }
    if (auth && auth === "admin") {
      history.push("/admin");
    }
  }, [auth, history]);


  return (
    <FormDiv>
      <form
        onSubmit={e => {
          e.preventDefault();
          login(user.username, user.password);
          setUser({ username: "", password: "" });
        }}
      >
        <input
          className="input"
          type="String"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
        />
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
        <button className="bttn">Submit</button>
      </form>

      <div className="login">
        <p>
          name: <span style={{ fontWeight: "bold" }}>user</span> password:{" "}
          <span style={{ fontWeight: "bold" }}>user</span>
        </p>
        <p>
          name: <span style={{ fontWeight: "bold" }}>admin</span> password:{" "}
          <span style={{ fontWeight: "bold" }}>admin</span>
        </p>
      </div>
    </FormDiv>
  );
};

export default Login;
