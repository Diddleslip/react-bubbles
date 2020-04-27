import React, { useState } from "react";
import { useHistory } from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth";

// const initialState = 

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  let history = useHistory();

  const handleChange = e => {
    setLogin({
      ...login, 
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth()
    .post(`/api/login`, login)
    .then(response => {
      console.log(response.data.payload);
      localStorage.setItem("token", response.data.payload)
      history.push("/bubble-page")
    })
    .catch(error => {
      console.log(error.response.data)
    })
  }

  return (
    <>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input 
            name="username"
            type="text"
            placeholder="Username.."
            value={login.username}
            onChange={handleChange}
          />
        </label>

        <label>
          <input 
            name="password"
            type="text"
            placeholder="Password.."
            value={login.password}
            onChange={handleChange}
          />
        </label>
        <button>Log in</button>
      </form>
    </>
  );
};

export default Login;
