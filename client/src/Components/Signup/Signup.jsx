import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import { backendUrl } from "../../constants.js";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const response = await fetch(`${backendUrl}/signup`, {
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
    console.log(json);
    if (response.ok) {
      navigate("/login");
    }
  };

  return (
    <div id="signup" className="flex-col">
      <h1>Signup</h1>
      <div className="signup-form">
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

        <button type="submit" id="signup-btn" onClick={handleSignup}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Signup;
