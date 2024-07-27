import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [surveys, setSurveys] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:5005/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    const fetchSurveys = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/surveys", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const surveysData = await response.json();
        setSurveys(surveysData);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchUser();
    fetchSurveys();
  }, [navigate]);

  const deleteSurvey = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`http://localhost:5005/api/surveys/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setSurveys(surveys.filter((survey) => survey._id !== id));
      } else {
        console.error("Failed to delete survey");
      }
    } catch (error) {
      console.error("Error deleting survey:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user.name}'s Profile</h1>
      <h2>Your Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey._id}>
            <Link to={`/surveys/${survey._id}`}>{survey.title}</Link>
            <button onClick={() => deleteSurvey(survey._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link to="/create-survey">
        <button>Create New Survey</button>
      </Link>
    </div>
  );
}

export default UserProfile;
