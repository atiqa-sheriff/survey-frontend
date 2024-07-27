import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin
      ? "http://localhost:5005/api/auth/login"
      : "http://localhost:5005/api/auth/register";

    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store the token in local storage
      navigate("/profile"); // Redirect to profile page after successful login/signup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>SurveySphere</h1>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
        )}
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
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        <button type="button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Have an account? Sign Up" : "Have an account? Login"}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default HomePage;
