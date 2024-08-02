import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SurveyCompleted() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleShare = () => {
    alert(`Survey shared to ${email}`);

    fetch("http://localhost:5005/api/share", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Email sent:", data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  const handleBackToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="survey-completed-container">
      <h1 className="title">Survey Completed</h1>
      <p>Your survey has been successfully created!</p>
      <div className="email-input-container">
        <label>Email Addresses:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>

      <button className="submit" onClick={handleShare}>
        Share Survey
      </button>
      <button className="submit" onClick={handleBackToProfile}>
        Back to Profile
      </button>
    </div>
  );
}

export default SurveyCompleted;
