import { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUpForm.css"; // Import the CSS file

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // function for handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //function for handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    // api req
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        // Handle error response
        console.error("Error signing up:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };
  return (
    <div className="form-container">
      <div>
        <h2>Sign Up</h2>
      </div>

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter Your Name Here"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email Here"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            placeholder="Enter Your Password Here"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            placeholder="Confirm Password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign Up</button>
        <Link to="/" className="login-link">
          Login Here
        </Link>
      </form>
    </div>
  );
};

export default SignUpForm;
