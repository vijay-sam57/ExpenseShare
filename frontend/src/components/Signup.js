import React, { useState } from "react";
import "./Login.css";
import "./Signup.css";

function LoginForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
  };
  return (
    <div className="signup">
      <div>
        <h2 className="hero1">Sign Up</h2>
        <p className="hero2">Fill your details.</p>
        <form onSubmit={submitForm} autoComplete="off">
          <div className="inputbox">
            <div className="userinput">
              <p>Username:</p>
              <input
                required
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="userinput">
              <p>Email:</p>
              <input
                required
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="userinput">
              <p>Password:</p>
              <input
                required
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="userinput">
              <p>Retype your password:</p>
              <input
                required
                id="confirmpassword"
                type="password"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
          </div>
          <div>
            <input type="submit" value="Sign Up" className="submit-btn"></input>
          </div>
          <div className="register">
            <a href="/">Registered? Go to Login</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
