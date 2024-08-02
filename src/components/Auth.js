import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "register";
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${config.apiUrl}/api/auth/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.errors ? data.errors[0].msg : "Network response was not ok"
        );
      }

      handleLoginSignupResponse(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLoginSignupResponse = (response) => {
    if (response.token) {
      localStorage.setItem("token", response.token);
      navigate("/profile"); // Navigate to profile after successful login/signup
    } else {
      setError("Authentication failed");
    }
  };

  return (
    <div className="page-content">
      <h1 className="title">SurveySphere</h1>
      <h2 className="subheading">{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="submit" type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

          <button className="submit" onClick={() => setIsLogin(!isLogin)}>
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Have an account? Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default Auth;
