import { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";

function LoginForm() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [isSubmit, setIsSubmit] = useState(false); // will be used later to goto homepage

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const submitForm = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
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
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 10 characters";
      flag = false;
    }
    if (flag) {
      loginUser(formValues).then((jwtTokenData) => {
        setMessage(jwtTokenData.response);
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
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="hero2">{message}</div>
        ) : (
          <p className="hero2">Login to continue.</p>
        )}
        <form onSubmit={submitForm} autoComplete="off" noValidate>
          <div className="inputbox">
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
