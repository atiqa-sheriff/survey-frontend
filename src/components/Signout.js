// src/components/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./HomePage";
import SurveyList from "./SurveyList";
import CreateSurvey from "./CreateSurvey";
import SurveyDetails from "./SurveyDetails";
import UserProfile from "./UserProfile";
import SurveyCompleted from "./SurveyCompleted";
import Login from "./Login";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/surveys">Surveys</Link>
            </li>
            <li>
              <Link to="/create-survey">Create Survey</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/surveys" element={<SurveyList />} />
          <Route path="/create-survey" element={<CreateSurvey />} />
          <Route path="/surveys/:id" element={<SurveyDetails />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/survey-completed" element={<SurveyCompleted />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
