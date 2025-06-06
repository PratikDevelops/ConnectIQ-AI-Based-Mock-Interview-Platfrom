import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPrint } from "react-icons/fa";

const FeedbackPage = () => {
  const score = 7; // static score out of 10

  const questions = [
    {
      question: "What is React?",
      suggestedAnswer:
        `React is an open-source JavaScript library developed by Facebook for building fast and interactive user interfaces, particularly for single-page applications. 
      It allows developers to create reusable UI components that efficiently update and render just the right parts of the page as the data changes, 
      making the app highly performant and scalable.`,
      userAnswer: `React is a framework to make websites.`,
      improvement:
        `The user's answer is partly correct but lacks precision. React is not a full framework; it is a library focused mainly on the View layer of applications. 
      Unlike frameworks, it doesn't prescribe application architecture but provides flexibility in managing UI components and state.`,
      needsReview: false,
      submittedAt: "2025-06-05 14:30",
    },
    {
      question: "Explain state in React.",
      suggestedAnswer:
        `State in React refers to a built-in object used to store property values that belong to a component. 
      It holds data that can change over the component's lifecycle and influences what is rendered on the UI. 
      When the state changes, React re-renders the component to reflect the new state.`,
      userAnswer: `State stores data in React components.`,
      improvement:
        `The user's answer is very basic and does not explain the reactive nature of state. State is not just storage; it is mutable and local to the component. 
      It allows components to create dynamic and interactive interfaces by triggering re-renders upon state updates. 
      Additionally, state updates are asynchronous and should be handled using React's setState function or hooks like useState.`,
      needsReview: true,
      submittedAt: "2025-06-05 14:45",
    },
    {
      question: "What are props in React?",
      suggestedAnswer:
        `Props (short for properties) are read-only inputs passed from parent components to child components in React. 
      They allow data to flow down the component tree, enabling components to be dynamic and reusable. 
      Props cannot be modified by the child components—they are immutable, ensuring a one-way data flow that helps maintain predictable UI behavior.`,
      userAnswer: `Props are parameters for React components.`,
      improvement:
        `The user's answer captures the general idea but lacks detail. Props are indeed parameters but more specifically serve as immutable data passed from parent to child components to customize rendering and behavior. 
      Unlike state, props are controlled externally and cannot be changed by the receiving component, reinforcing unidirectional data flow in React.`,
      needsReview: false,
      submittedAt: "2025-06-05 15:00",
    },
  ];

  // Expand/collapse control per question
  const [expanded, setExpanded] = useState(Array(questions.length).fill(true));

  const toggleExpand = (idx) => {
    const newExpanded = [...expanded];
    newExpanded[idx] = !newExpanded[idx];
    setExpanded(newExpanded);
  };

  // Dynamic score color
  const getScoreColor = () => {
    if (score >= 8) return "text-green-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  // Count flagged questions
  const flaggedCount = questions.filter((q) => q.needsReview).length;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-10 lg:px-20 flex flex-col md:flex-row gap-10">
      {/* Sidebar summary */}
      <aside className="md:w-1/4 sticky top-16 bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6">
        <h2 className="text-2xl font-extrabold text-indigo-700 tracking-wide">
          Summary
        </h2>
        <div className="text-gray-700 space-y-3">
          <p className="text-lg">
            <span className="font-semibold">Total Questions:</span>{" "}
            {questions.length}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Flagged for Review:</span>{" "}
            <span
              className={
                flaggedCount > 0
                  ? "text-red-600 font-bold"
                  : "text-green-600 font-bold"
              }
            >
              {flaggedCount}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Score:</span>{" "}
            <span
              className={`text-4xl font-extrabold ${getScoreColor()} tracking-tight`}
            >
              {score} / 10
            </span>
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-300 rounded-full h-5 overflow-hidden shadow-inner">
          <div
            className={`h-5 rounded-full transition-all duration-700 ease-in-out ${getScoreColor()} bg-gradient-to-r from-indigo-400 to-indigo-600`}
            style={{ width: `${(score / 10) * 100}%` }}
          />
        </div>

        <button
          onClick={handlePrint}
          className="mt-auto bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-3 transition-shadow shadow-md"
          aria-label="Print Feedback"
        >
          <FaPrint /> Print Feedback
        </button>
      </aside>

      {/* Questions content */}
      <main className="md:w-3/4 flex flex-col gap-8">
        <h1 className="text-4xl font-bold text-indigo-700 tracking-wide mb-4">
          Interview Feedback Summary
        </h1>

        {questions.map(
          (
            {
              question,
              userAnswer,
              suggestedAnswer,
              improvement,
              needsReview,
              submittedAt,
            },
            idx
          ) => (
            <section
              key={idx}
              className={`bg-white rounded-2xl shadow-lg p-6 border ${
                needsReview
                  ? "border-red-400 bg-red-50"
                  : "border-gray-200 hover:shadow-xl transition-shadow duration-300"
              }`}
            >
              <header
                className="flex justify-between items-center cursor-pointer select-none"
                onClick={() => toggleExpand(idx)}
              >
                <h2 className="text-xl font-semibold text-indigo-800 max-w-[90%]">
                  Q{idx + 1}: {question}
                </h2>
                <button
                  aria-label={expanded[idx] ? "Collapse details" : "Expand details"}
                  className="text-indigo-600 text-2xl font-extrabold focus:outline-none"
                >
                  {expanded[idx] ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </header>

              {expanded[idx] && (
                <div className="mt-5 space-y-5">
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Your Answer:</p>
                    <p className="bg-gray-50 rounded-lg border border-gray-300 p-4 text-gray-800 whitespace-pre-wrap">
                      {userAnswer || (
                        <em className="text-gray-400">No answer provided.</em>
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700 mb-1">
                      Suggested Answer:
                    </p>
                    <p className="bg-indigo-50 rounded-lg border border-indigo-300 p-4 text-indigo-800 whitespace-pre-wrap">
                      {suggestedAnswer || (
                        <em className="text-gray-400">
                          No suggested answer available.
                        </em>
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-gray-700 mb-1">
                      Improvement Suggestion:
                    </p>
                    <p className="bg-green-50 rounded-lg border border-green-300 p-4 text-green-800 whitespace-pre-wrap">
                      {improvement || (
                        <em className="text-gray-400">No improvement suggested.</em>
                      )}
                    </p>
                  </div>

                  {needsReview && (
                    <p className="text-red-600 font-semibold mt-2 flex items-center gap-2">
                      ⚠️ This question needs further review.
                    </p>
                  )}

                  <p className="text-sm text-gray-500 italic mt-1">
                    Submitted at: {submittedAt}
                  </p>
                </div>
              )}
            </section>
          )
        )}
      </main>
    </div>
  );
};

export default FeedbackPage;
