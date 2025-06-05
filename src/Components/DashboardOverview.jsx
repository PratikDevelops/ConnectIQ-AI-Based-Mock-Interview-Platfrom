import React, { useEffect, useState } from "react";
import { FaRedoAlt, FaCommentDots, FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DashboardOverview = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: Replace with actual backend API call
    /*
    fetch("/api/interviews")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch interviews");
        return res.json();
      })
      .then((data) => {
        setInterviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    */

    // Mock data for demo
    setTimeout(() => {
      setInterviews([
        {
          id: 1,
          company: "TechCorp",
          position: "Frontend Developer",
          date: "2025-05-20",
          feedback: "Good problem-solving skills, needs improvement in React hooks.",
        },
        {
          id: 2,
          company: "InnovateX",
          position: "Backend Developer",
          date: "2025-04-15",
          feedback: "Strong knowledge of databases and APIs.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleViewFeedback = (feedback) => {
    alert(`Feedback:\n${feedback}`);
  };

  const handleRetakeInterview = (id) => {
    alert(`Starting interview again for interview ID: ${id}`);
  };

  const handleTakeNewInterview = () => {
    navigate("/dashboard/interview");


 
  };

  if (loading) return <div className="mt-10">Loading previous interviews...</div>;
  if (error) return <div className="mt-10 text-red-600">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">Your Previous Interviews</h2>

      <button
        onClick={handleTakeNewInterview}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded shadow-md flex items-center gap-2"
      >
        <FaPlay />
        Take New Interview
      </button>

      {interviews.length === 0 ? (
        <p>No previous interviews found.</p>
      ) : (
        <div className="space-y-6">
          {interviews.map(({ id, company, position, date, feedback }) => (
            <div
              key={id}
              className="border border-gray-300 rounded-lg p-6 shadow hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-3">
                <p className="font-semibold text-xl text-indigo-800">
                  {position} @ {company}
                </p>
                <p className="text-gray-600 text-sm">Date: {date}</p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleViewFeedback(feedback)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow flex items-center gap-2"
                >
                  <FaCommentDots />
                  View Feedback
                </button>
                <button
                  onClick={() => handleRetakeInterview(id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow flex items-center gap-2"
                >
                  <FaRedoAlt />
                  Take Interview Again
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
