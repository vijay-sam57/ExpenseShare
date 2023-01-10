import React, { useState, useEffect } from "react";
import "./Login.css";
import "./Signup.css";
import axios from "axios";

function LoginForm() {
  const initialValues = { userName: "", email: "", password: "" , confirmPassword:"" };
  const auth = {}
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);

  const validate = (values) => {
    var flag = true;
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.userName) {
      errors.name = "Username is required!";
      flag = false;
    }
    if (!values.email) {
      errors.email = "Email is required!";
      flag = false;
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
      flag = false;
    }
    if (!values.password) {
      errors.password = "Password is required";
      flag = false;
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      flag = false;
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
      flag = false;
    }
    if (!(values.password === values.confirmPassword)) {
      errors.confirmPassword = "Passwords don't match";
      flag = false;
    }
    if (flag) {
      auth.userName = formValues.userName;
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
        body: JSON.stringify(formValues),
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
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          (message==="true")?<div className="hero2">Username already exists</div>:<div className="hero2">Signed up</div>
          ) : (
            <p className="hero2">Fill your details.</p>
        )}
        <form onSubmit={submitForm} autoComplete="off" noValidate>
          <div className="inputbox">
            {/* {Object.keys(formErrors).length === 0 && isSubmit ? (
              <div className="success">Signed up successfully</div>
            ) : (
              <></>
            )} */}
            <div className="userinput">
              <p>Username:</p>
              <p className="err">{formErrors.name}</p>
              <input
                required
                id="name"
                type="text"
                name="userName"
                placeholder="Username"
                value={formValues.userName}
                onChange={handleChange}
              ></input>
            </div>
            <div className="userinput">
              <p>Email:</p>
              <p className="err">{formErrors.email}</p>
              <input
                required
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              ></input>
            </div>
            <div className="userinput">
              <p>Password:</p>
              <p className="err">{formErrors.password}</p>
              <input
                required
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              ></input>
            </div>
            <div className="userinput">
              <p>Retype your password:</p>
              <p className="err">{formErrors.confirmPassword}</p>
              <input
                required
                id="confirmpassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
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
