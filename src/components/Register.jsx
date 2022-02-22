import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import http from "axios";
import message from "./message";

const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const response = await http.post(
        "http://localhost:5000/api/user/signup",
        {
          username: username,
          password: password,
        }
      );
      setUsername("");
      setPassword("");
      message("Success");
    } catch (error) {
      if (error.response.status === 400) {
        message("Missing credentials");
      } else if (error.response.status === 409)
        message("Username already exists");
    }
  };

  return (
    <div className='card'>
      <h1>Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Link to="/"><button className="reg" onClick={(e) => signUp()}>Register</button></Link>
      <Link to="/login"><button>I already have an account</button></Link>
    </div>
  )
}

export default Register