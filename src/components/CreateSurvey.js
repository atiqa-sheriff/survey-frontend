import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([{ text: "", options: [""] }]);
  const navigate = useNavigate();

  const handleQuestionChange = (index, event) => {
    const newQuestions = [...questions];
    newQuestions[index].text = event.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, event) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = event.target.value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: "", options: [""] }]);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push("");
    setQuestions(newQuestions);
  };

  const deleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.splice(oIndex, 1);
    setQuestions(newQuestions);
  };

  const deleteQuestion = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(qIndex, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found. Please log in again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5005/api/surveys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, questions }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Survey created:", data);
      setTitle("");
      setDescription("");
      setQuestions([{ text: "", options: [""] }]);
      navigate("/survey-completed");
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };
  const handleBackToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="main-content">
      <div className="container">
        <h1 className="title">Create a New Survey</h1>
        <div id="survey-form-wrapper">
          <form id="survey-form" onSubmit={handleSubmit}>
            <div>
              <label>Survey Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Survey Description:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            {questions.map((question, qIndex) => (
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
                  <span className="action-link add-link" onClick={addQuestion}>
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
            <div className="create-survey-container">
              <button className="submit" type="submit">
                Create Survey
              </button>
              <button
                className="submit"
                type="button"
                onClick={handleBackToProfile}
              >
                Back to Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateSurvey;
