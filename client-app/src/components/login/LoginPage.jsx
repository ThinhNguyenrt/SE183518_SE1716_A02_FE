import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://localhost:7176/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Password: password }),
      });

      if (!response.ok) throw new Error("Invalid credentials");

      const result = await response.json();
      const data = result.data;

      // Store token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("role", data.accountRole); // numeric role

      onLoginSuccess?.(data);

      // Redirect based on numeric role
      if (data.accountRole === 3) {
        navigate("/admin");
      } else if (data.accountRole === 1) {
        navigate("/staff");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="glass-container">
      <form className="glass-box" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error-text">{error}</p>}

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <p className="footer-text">
          © {new Date().getFullYear()} News Management System
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
