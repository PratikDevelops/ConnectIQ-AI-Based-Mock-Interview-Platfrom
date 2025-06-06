import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FaBriefcase } from "react-icons/fa";

const MODEL_NAME = "gemini-2.5-flash-preview-04-17";
const API_KEY = "AIzaSyCoYNO_88mK05IWYVFbkeK69sFpDXmK6fc";

const commonSkills = ["React", "Node.js", "MongoDB", "SQL", "CSS", "JavaScript", "Python"];

const InterviewPage = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!position.trim()) newErrors.position = "Position is required";
    if (!skills.trim()) newErrors.skills = "Please enter skills";
    if (!experience.trim()) newErrors.experience = "Enter years of experience";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstErrorField}"]`)?.focus();
      return;
    }

    setLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });

      const prompt = `
My name is ${name}. I want to prepare for a ${position} interview.
My skills are: ${skills}. I have ${experience} years of experience.

Generate 5 interview questions and answers in JSON:
[
  {
    "question": "Your question?",
    "answer": "Your answer."
  }
]
Only return valid JSON.
      `;

      const result = await model.generateContent(prompt);
      const rawText = (await result.response.text()).trim();
      const cleanJson = rawText.replace(/^```json|```$/g, "").trim();
      const parsed = JSON.parse(cleanJson);

      navigate("/interview-questions", {
        state: { name, position, skills, experience, portfolio, Question: parsed },
      });
    } catch (error) {
      console.error("Gemini Error:", error);
      alert("Failed to generate questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset the form?")) {
      setName("");
      setPosition("");
      setSkills("");
      setExperience("");
      setPortfolio("");
      setErrors({});
    }
  };

  const progress = [name, position, skills, experience].filter(Boolean).length / 4 * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto mt-16 p-8 rounded-lg shadow-md bg-white"
    >
      <h1 className="text-3xl font-semibold mb-4 text-indigo-700 text-center flex items-center justify-center gap-2">
        <FaBriefcase /> Prepare for Your Interview
      </h1>

      <div className="h-2 w-full bg-gray-200 rounded-full mb-6">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <label className="block font-medium mb-1">Full Name</label>
          <input
            name="name"
            type="text"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Pratik Kedar"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Position</label>
          <input
            name="position"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Frontend Developer"
          />
          {errors.position && <p className="text-red-600 text-sm mt-1">{errors.position}</p>}
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Skills</label>
          <input
            name="skills"
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. React, Node.js, SQL"
          />
          {errors.skills && <p className="text-red-600 text-sm mt-1">{errors.skills}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {commonSkills.map((skill, idx) => (
              <span
                key={idx}
                onClick={() => setSkills((prev) => prev ? `${prev}, ${skill}` : skill)}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm cursor-pointer hover:bg-indigo-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Experience (Years)</label>
          <input
            name="experience"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 2"
            min="0"
          />
          {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience}</p>}
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-1">Portfolio (Optional)</label>
          <input
            type="url"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div className="flex justify-between mt-6">
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
            {loading ? "Generating..." : "Submit Interview"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default InterviewPage;
