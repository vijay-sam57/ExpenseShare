import React, { useState } from "react";
import "./Login.css";
import axios from "axios";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false); // will be used later to goto homepage
  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(email, password));
  };
  const validate = (email, password) => {
    var flag = true;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
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
    if (flag) {
      loginUser({ email, password }).then(() => {
        setIsSubmit(true);
      });
    }
    return errors;
  };
  const loginUser = (formValues) => {
    return axios
      .post("http://localhost:8080/check", formValues)
      .then((response) => response.data);
  };
  return (
    <div className="login">
      <div>
        <h2 className="hero1">Login</h2>
        <p className="hero2">Login to continue.</p>
        <form onSubmit={submitForm} autoComplete="off" noValidate>
          <div className="inputbox">
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
          </div>
          <div>
            <input type="submit" value="Submit" className="submit-btn"></input>
          </div>
          <div className="register">
            <a href="/signup">Not registered? Create Account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
