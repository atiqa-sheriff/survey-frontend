import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import UserProfile from "./components/UserProfile";
import SurveyList from "./components/SurveyList";
import CreateSurvey from "./components/CreateSurvey";
import SurveyDetails from "./components/SurveyDetails";
import SurveyCompleted from "./components/SurveyCompleted";
import Auth from "./components/Auth";
import "./App.css"; // Import CSS file
import teamLogo from "./team_logo.png"; // Import logo

const App = () => {
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <header>
        <div className="logo">
          <img src={teamLogo} alt="Team Logo" />
          <span>SurveySphere</span>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          {isAuthenticated() && (
            <li>
              <button onClick={handleLogout}>Sign Out</button>
            </li>
          )}
        </ul>
      </header>
      <div className="main-frame">
        <div className="frame">
          <div className="login">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/profile"
                element={isAuthenticated() ? <UserProfile /> : <Auth />}
              />
              <Route
                path="/surveys"
                element={isAuthenticated() ? <SurveyList /> : <Auth />}
              />
              <Route
                path="/create-survey"
                element={isAuthenticated() ? <CreateSurvey /> : <Auth />}
              />
              <Route path="/surveys/:id" element={<SurveyDetails />} />
              <Route path="/survey-completed" element={<SurveyCompleted />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
