import React, { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();


    setLoading(true);
    setError("");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch(
        "http://adethis.com/be/api/auth/register", // URL for registration
        {
          method: "POST",
          body: JSON.stringify({
            username: username,
            email: email,
            password: password,
          }),
          headers: headers,
          redirect: "follow",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setApiResponse(result);
        setError(""); // Clear any previous errors
      } else {
        setError(result.message || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {apiResponse && <div></div>}
    </div>
  );
};

export default RegistrationForm;
