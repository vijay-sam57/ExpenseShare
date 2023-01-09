import React, { useState } from "react";
import "./Login.css";

function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <div className="login">
      <div>
        <h2 className="hero1">Login</h2>
        <p className="hero2">Login to continue.</p>
        <form onSubmit={submitForm} autoComplete="off">
          <div className="inputbox">
            <div className="userinput">
              <p for={"name"}>Username:</p>
              <input
                required
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="userinput">
              <p for={"id"}>Password:</p>
              <input
                required
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <input type="submit" value="Submit" className="submit-btn"></input>
          </div>
          <div className="register">
            <a href="/">Not registered? Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
