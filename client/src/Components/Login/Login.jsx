import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { backendUrl } from "../../constants.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${backendUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await response.json();
      if (response.ok) {
        localStorage.setItem("token", json.token);
        navigate("/problemset/all");
      } else {
        alert(json.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div id="login" className="flex-col">
      <h1>Login</h1>
      <div className="login-form">
        <div className="subform">
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            placeholder="Your Email"
          />
        </div>

        <div className="subform">
          <label htmlFor="password">Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Your Password"
          />
        </div>

        <button type="submit" id="login-btn" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
