import React, { useState } from "react";
import "./Login.css";
import "./Signup.css";
import axios from "axios";

function LoginForm() {
  const auth = {};
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");
  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(name, email, password, confirmpassword));
    setIsSubmit(true);
  };
  const validate = (username, email, password, confirmPassword) => {
    var flag = true;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!username) {
      errors.name = "Username is required!";
      flag = false;
    }
    if (!email) {
      errors.email = "Email is required!";
      flag = false;
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format!";
      flag = false;
    }
    if (!password) {
      errors.password = "Password is required";
      flag = false;
    } else if (password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      flag = false;
    } else if (password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
      flag = false;
    }
    if (!(password === confirmPassword)) {
      errors.confirmPassword = "Passwords don't match";
      flag = false;
    }
    if (flag) {
      auth.name = name;
    }
    if (Object.keys(auth).length > 0) {
      signinUser(auth).then((jwtTokenData) => {
        setMessage(jwtTokenData.response);
      });
    }
    if (message === "true") {
      errors.userName = "Username already exists";
    }
    if (flag && message === "false") {
      fetch("http://localhost:8080/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });
    }
    return errors;
  };
  const signinUser = (auth) => {
    return axios
      .post("http://localhost:8080/auth", auth)
      .then((response) => response.data);
  };
  return (
    <div className="signup">
      <div>
        <h2 className="hero1">Sign Up</h2>
        <p className="hero2">Fill your details.</p>
        <form onSubmit={submitForm} autoComplete="off" noValidate>
          <div className="inputbox">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="success">Signed up successfully</div>
            ) : (
              <></>
            )}
            <div className="userinput">
              <p>Username:</p>
              <p className="err">{formErrors.name}</p>
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
              <p className="err">{formErrors.email}</p>
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
              <p className="err">{formErrors.password}</p>
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
              <p className="err">{formErrors.confirmPassword}</p>
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
