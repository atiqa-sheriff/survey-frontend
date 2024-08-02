import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5005/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/profile"); // Redirect to profile page upon successful login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-content">
      <h1 className="title">SurveySphere</h1>
      <h2 className="subheading">Login</h2>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button className="submit" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
