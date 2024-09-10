import React, { useState, useEffect } from "react";

const Merchant = () => {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [merchants, setMerchants] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedStatus = localStorage.getItem("authstatus");
    setToken(storedToken || "Token not found");
    setStatus(storedStatus || "Status not found");

    if (!storedToken) {
      setError("No token found. Please log in.");
      return;
    }

    console.log("Token being used:", storedToken);

    fetch("http://adethis.com/be/api/merchant/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized access - please log in again.");
          } else {
            setError(`Error: ${response.statusText}`);
          }
          return;
        }
        return response.json();
      })
      .then((data) => {
        console.log("API Response:", data);
        if (data && data.data && Array.isArray(data.data)) {
          setMerchants(data.data);
        } else {
          setError("-.");
        }
      })
      .catch((error) => {
        console.error("Error fetching merchants:", error);
        setError("An error occurred while fetching merchants.");
      });
  }, []);

  return (
    <div>
      <h2>HASIL DARI API</h2>
      <p>
        <strong>Token:</strong> {token}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {merchants.length > 0 ? (
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Name
              </th>
              <th style={{ border: "1px solid black", padding: "8px" }}>
                Additional Info
              </th>
            </tr>
          </thead>
          <tbody>
            {merchants.map((merchant) => (
              <tr key={merchant.id}>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {merchant.id}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {merchant.name}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {merchant.additionalInfo || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !error && <p>No merchants found.</p>
      )}
    </div>
  );
};

export default Merchant;
