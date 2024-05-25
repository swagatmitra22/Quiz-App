import React, { useState, useEffect } from "react";
import "./QuizApp.css";

const QuizApp = () => {
  const questions = [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: 'Who is the author of "To Kill a Mockingbird"?',
      answerOptions: [
        { answerText: "Mark Twain", isCorrect: false },
        { answerText: "Harper Lee", isCorrect: true },
        { answerText: "Ernest Hemingway", isCorrect: false },
        { answerText: "F. Scott Fitzgerald", isCorrect: false },
      ],
    },
    {
      questionText: "What is the capital of Australia?",
      answerOptions: [
        { answerText: "Sydney", isCorrect: false },
        { answerText: "Melbourne", isCorrect: false },
        { answerText: "Canberra", isCorrect: true },
        { answerText: "Perth", isCorrect: false },
      ],
    },
    {
      questionText: 'Which planet is known as the "Red Planet"?',
      answerOptions: [
        { answerText: "Venus", isCorrect: false },
        { answerText: "Mars", isCorrect: true },
        { answerText: "Jupiter", isCorrect: false },
        { answerText: "Saturn", isCorrect: false },
      ],
    },
    {
      questionText: "Who painted the Mona Lisa?",
      answerOptions: [
        { answerText: "Vincent van Gogh", isCorrect: false },
        { answerText: "Pablo Picasso", isCorrect: false },
        { answerText: "Leonardo da Vinci", isCorrect: true },
        { answerText: "Claude Monet", isCorrect: false },
      ],
    },
    {
      questionText: "What is the square root of 144?",
      answerOptions: [
        { answerText: "10", isCorrect: false },
        { answerText: "11", isCorrect: false },
        { answerText: "12", isCorrect: true },
        { answerText: "13", isCorrect: false },
      ],
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [timeRemaining, setTimeRemaining] = useState(120);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerOptionClick = (index) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
  };

  const score = answers.reduce((score, answer, index) => {
    return (
      score +
      (answer != null && questions[index].answerOptions[answer].isCorrect
        ? 1
        : 0)
    );
  }, 0);

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">Quiz Application</h2>
      {showScore ? (
        <div className="score-section">
          <span className="score">You scored {score} out of {questions.length}</span>
          {questions.map((question, index) => {
            const correctAnswer = question.answerOptions.find(
              (option) => option.isCorrect
            ).answerText;
            const userAnswer =
              question.answerOptions[answers[index]]?.answerText ||
              "Not Answered";
            return (
              <div key={index} className="question-score">
                <div style={{ fontWeight: "600", }}>
                  {index + 1}. {question.questionText}
                </div>
                <div style={{ paddingTop: "0.5rem", paddingBottom: "1rem" }}>
                  <div style={{ color: "green" }}>
                    Correct Answer: {correctAnswer}
                  </div>
                  <div
                    style={{
                      color: userAnswer === correctAnswer ? "green" : "red",
                    }}
                  >
                    Your Answer: {userAnswer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>
                <span>Question {currentQuestion + 1}</span>/{questions.length}
              </span>
              <span className="timer">Time Remaining: {timeRemaining} sec</span>
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <div key={index} className="options">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="quizOption"
                    value={answerOption.answerText}
                    checked={answers[currentQuestion] === index}
                    onChange={() => handleAnswerOptionClick(index)}
                  />
                  <label htmlFor={`option-${index}`}>
                    {answerOption.answerText}
                  </label>
                </div>
              )
            )}
          </div>
          <div className="navigation-buttons">
            {currentQuestion !== questions.length - 1 && (
              <button onClick={handleNext}>Next</button>
            )}
            {currentQuestion > 0 && (
              <button onClick={handlePrevious}>Previous</button>
            )}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizApp;
