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

  return (
    <div className="container">
      <h1>Create a New Survey</h1>
      <form id="survey-form" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-item">
            <label>Question {qIndex + 1}:</label>
            <input
              type="text"
              value={question.text}
              onChange={(e) => handleQuestionChange(qIndex, e)}
              required
            />
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="option-container">
                <label>Option {oIndex + 1}:</label>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(qIndex, oIndex, e)}
                  required
                />
                <button
                  type="button"
                  className="delete-option"
                  onClick={() => deleteOption(qIndex, oIndex)}
                >
                  Delete Option
                </button>
              </div>
            ))}
            <button
              type="button"
              className="add-option"
              onClick={() => addOption(qIndex)}
            >
              Add Option
            </button>
            <button
              type="button"
              className="delete-question"
              onClick={() => deleteQuestion(qIndex)}
            >
              Delete Question
            </button>
          </div>
        ))}
        <div className="buttons-container">
          <button type="button" onClick={addQuestion}>
            Add Question
          </button>
          <button type="submit">Create Survey</button>
        </div>
      </form>
    </div>
  );
}

export default CreateSurvey;
