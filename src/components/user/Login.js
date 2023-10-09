import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { login, clearErrors } from "../../actions/userAction";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Track whether to show or hide the password

  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Function to handle form submission
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = "/";
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, isAuthenticated, error]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle between showing and hiding the password
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type={showPassword ? "text" : "password"} // Show or hide password based on showPassword state
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="showPassword"
                    onChange={togglePasswordVisibility}
                  />
                  <label className="form-check-label" htmlFor="showPassword">
                    Show Password
                  </label>
                </div>
                <Link
                  to="/users/forgetPassword"
                  className="float-right mb-4"
                  style={{ color: "#2e2b2b" }}
                >
                  Forgot Password
                </Link>
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py3"
                >
                  LOGIN
                </button>
                <Link
                  to="/users/signup"
                  className="float-right mt-3"
                  style={{ color: "#2e2b2b" }}
                >
                  NEW USER?
                </Link>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Login;
