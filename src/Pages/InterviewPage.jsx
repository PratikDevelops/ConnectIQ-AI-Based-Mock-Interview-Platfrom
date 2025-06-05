import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // 👈 Import useNavigate

const InterviewPage = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 👈 Initialize navigate

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!position.trim()) newErrors.position = "Position is required";
    if (!skills.trim()) newErrors.skills = "Please enter skills";
    if (!experience.trim()) newErrors.experience = "Please enter years of experience";
    return newErrors;
  };

  const handleReset = () => {
    setName("");
    setPosition("");
    setSkills("");
    setExperience("");
    setPortfolio("");
    setErrors({});
    setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setSubmitStatus("success");

      // Redirect after short delay to show success message
      setTimeout(() => {
        navigate("/interview-questions", {
          state: { name, position, skills, experience, portfolio },
        });
      }, 1000);

    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-xl mx-auto mt-16 p-8 rounded-lg shadow-md bg-white"
    >
      <h1 className="text-3xl font-semibold mb-6 text-indigo-700 text-center">
        Take Interview
      </h1>

      {submitStatus === "success" && (
        <div className="mb-4 p-4 text-green-800 bg-green-200 rounded">
          Interview submitted successfully! Redirecting...
        </div>
      )}
      {submitStatus === "error" && (
        <div className="mb-4 p-4 text-red-800 bg-red-200 rounded">
          There was an error submitting the interview. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-5">
          <label htmlFor="name" className="block font-medium mb-1">
            Candidate Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
            }`}
          />
          {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
        </div>


        <div className="mb-5">
          <label htmlFor="position" className="block font-medium mb-1">
            Position Applied For
          </label>
          <input
            type="text"
            id="position"
            name="position"
            placeholder="Enter position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.position
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
            }`}
          />
          {errors.position && <p className="text-red-600 mt-1">{errors.position}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="skills" className="block font-medium mb-1">
            Skills
          </label>
          <input
            type="text"
            id="skills"
            name="skills"
            placeholder="E.g. HTML, CSS, JavaScript"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.skills
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
            }`}
          />
          {errors.skills && <p className="text-red-600 mt-1">{errors.skills}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="experience" className="block font-medium mb-1">
            Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            min="0"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.experience
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-indigo-400"
            }`}
          />
          {errors.experience && <p className="text-red-600 mt-1">{errors.experience}</p>}
        </div>

        <div className="mb-5">
          <label htmlFor="portfolio" className="block font-medium mb-1">
            Portfolio Link (optional)
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            placeholder="https://yourportfolio.com"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 border-gray-300 focus:ring-indigo-400"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleReset}
            disabled={loading}
            className="px-6 py-3 rounded border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Interview"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewPage;
