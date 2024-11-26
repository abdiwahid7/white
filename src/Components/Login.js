import { useState, useContext } from "react";
import { AuthContext } from "../Components/Auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, error, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory(); // Use history for navigation

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  // Place the loginUser function here
  const loginUser = async (e) => {
    e.preventDefault();
    console.log({ email, password }); // Debug email and password
    try {
      await login(email, password, () => history.push("/Allstudent"));
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="form-content">
        <h4 className="form-title">Login</h4>
        <form className="custom-form" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="formBasicEmail">Email address</label>
            <input
              type="email"
              id="formBasicEmail"
              required
              onChange={handleEmail}
              placeholder="Enter email"
              name="email"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="formBasicPassword">Password</label>
            <input
              type="password"
              id="formBasicPassword"
              required
              onChange={handlePassword}
              placeholder="Password"
              name="password"
              className="form-input"
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="form-footer">
          Don't have an account?{" "}
          <Link to="/Register" className="register-link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
