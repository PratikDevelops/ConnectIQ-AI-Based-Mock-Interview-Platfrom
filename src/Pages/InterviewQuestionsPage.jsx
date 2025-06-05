import React from "react";
import { useLocation } from "react-router-dom";

const InterviewQuestionsPage = () => {
  const location = useLocation();
  const { name, position, skills, experience, portfolio } = location.state || {};

  return (
    <div className="max-w-3xl mx-auto p-8 mt-12 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Interview Questions for {name}</h2>
      <p><strong>Position:</strong> {position}</p>
      <p><strong>Skills:</strong> {skills}</p>
      <p><strong>Experience:</strong> {experience} years</p>
      {portfolio && <p><strong>Portfolio:</strong> <a href={portfolio} target="_blank" rel="noopener noreferrer">{portfolio}</a></p>}

      <div className="mt-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Suggested Questions:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-700">
          <li>Can you explain your experience with {skills.split(",")[0]}?</li>
          <li>Describe a challenging project you've worked on.</li>
          <li>How do you stay up to date with new technologies?</li>
          <li>Why are you interested in the {position} role?</li>
        </ul>
      </div>
    </div>
  );
};

export default InterviewQuestionsPage;
