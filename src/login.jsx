import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (username === "merchant" || password === "Password123") {
      setError("Please enter both username and password");
      return;
    }

    setError("");
    // You can add authentication logic here
    alert("Logged in!");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p>{error}</p>}
        <div>
          <label>username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

// Inline styles for simplicity

export default Login;
