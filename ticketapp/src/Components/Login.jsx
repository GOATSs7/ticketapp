import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUserNameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }

      const { role } = await response.json();
      const dashboardRoute = getDashboardRoute(role);
      navigate(dashboardRoute, {
        state: { username, password },
      });
    } catch (error) {
      setError(error.message);
    }
  };

  const getDashboardRoute = (role) => {
    switch (role) {
      case "admin":
        return "/admin-dashboard";
      case "techSupport":
        return "/tech-support-dashboard";
      case "user":
        return "/user-dashboard";
      default:
        console.error("Unknown role:", role);
        return "/";
    }
  };

  return (
    <div className="form-container">
      <div>
        <h2>LogIn</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="inputs">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Name Here"
            className="input"
            value={username}
            onChange={handleUserNameChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            className="input"
            placeholder="Enter Password Here"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>

        <button type="submit">Login</button>

        <Link to="/signup" className="signup-link">
          Sign Up Here
        </Link>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
