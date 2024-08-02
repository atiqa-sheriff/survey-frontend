import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function SurveyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5005/api/surveys/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSurvey(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching survey details:", error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...survey.questions];
    newQuestions[index].text = event.target.value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addOption = (qIndex) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options.push("");
    setSurvey({ ...survey, questions: newQuestions });
  };

  const deleteOption = (qIndex, oIndex) => {
    const newQuestions = [...survey.questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setSurvey({ ...survey, questions: newQuestions });
  };

  const addQuestion = () => {
    const newQuestions = [...survey.questions, { text: "", options: [""] }];
    setSurvey({ ...survey, questions: newQuestions });
  };

  const deleteQuestion = (qIndex) => {
    const newQuestions = [...survey.questions];
    newQuestions.splice(qIndex, 1);
    setSurvey({ ...survey, questions: newQuestions });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSurvey(() => navigate("/survey-completed"));
  };

  const handleGoBack = () => {
    updateSurvey(() => navigate("/profile"));
  };

  const updateSurvey = (callback) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5005/api/surveys/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(survey),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Survey updated:", data);
        callback();
      })
      .catch((error) => {
        console.error("Error updating survey:", error);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading survey details: {error.message}</div>;
  }

  if (!survey) {
    return <div>No survey found</div>;
  }

  return (
    <div className="container dynamic-margin-top">
      <h1 className="title">Edit Survey</h1>
      <div id="survey-form-wrapper">
        <form id="survey-form" onSubmit={handleSubmit}>
          <div>
            <label>Survey Title:</label>
            <input
              type="text"
              value={survey.title}
              onChange={(e) => setSurvey({ ...survey, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label>Survey Description:</label>
            <textarea
              value={survey.description}
              onChange={(e) =>
                setSurvey({ ...survey, description: e.target.value })
              }
              required
            />
          </div>
          {survey.questions.map((question, qIndex) => (
            <div key={qIndex} className="question-item">
              <label className="question">Question {qIndex + 1}:</label>
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, e)}
                required
              />
              <div className="question-actions">
                <span
                  className="action-link delete-link"
                  onClick={() => deleteQuestion(qIndex)}
                >
                  Delete Question
                </span>
                <span
                  className="action-link add-link"
                  onClick={() => addQuestion()}
                >
                  Add Question
                </span>
              </div>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="option-item">
                  <label>Option {oIndex + 1}:</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                    required
                  />
                  <div className="option-actions">
                    <span
                      className="action-link delete-link"
                      onClick={() => deleteOption(qIndex, oIndex)}
                    >
                      Delete Option
                    </span>
                    <span
                      className="action-link add-link"
                      onClick={() => addOption(qIndex)}
                    >
                      Add Option
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ))}
          <div className="buttons-container centered-buttons">
            <button className="submit" type="submit">
              Create Survey
            </button>
            <button className="submit" type="button" onClick={handleGoBack}>
              Go Back to Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SurveyDetails;
