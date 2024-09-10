import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
<link
  href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
  rel="stylesheet"
></link>;

const Login2 = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    try {
      const response = await fetch("http://adethis.com/be/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: headers,
        redirect: "follow",
      });

      const data = await response.json();

      if (response.ok) {
        // Save token and status to localStorage
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("authstatus", data.expiredAt || "default_status");

        // Redirect to the Merchant page upon successful login
        navigate("/merchant");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Error occurred during login");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm"></div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>

        {error && (
          <p className="mt-2 text-center text-sm text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
};

export default Login2;
