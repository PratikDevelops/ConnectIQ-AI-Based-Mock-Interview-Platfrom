import React, { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import { FaThumbsUp, FaRegMeh, FaThumbsDown } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const InterviewQuestionsPage = () => {
  const { state } = useLocation();
  const { name, Question } = state || {};

  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingIndex, setRecordingIndex] = useState(null);
  const [reactions, setReactions] = useState({});
  const [showWebcam, setShowWebcam] = useState(false);

  const recognitionRef = useRef(null);
  const webcamRef = useRef(null);

  const current = Question?.[currentQuestionIndex];

  const handleTextChange = (value) => {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: value }));
  };

  const startSpeechRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setRecordingIndex(currentQuestionIndex);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      handleTextChange((answers[currentQuestionIndex] || "") + " " + transcript);
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
      setRecordingIndex(null);
    };

    recognition.onend = () => {
      setRecordingIndex(null);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setRecordingIndex(null);
    }
  };

  const handleReaction = (emojiKey) => {
    setReactions((prev) => ({ ...prev, [currentQuestionIndex]: emojiKey }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < Question.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const reactionIcons = [
    { key: "like", icon: <FaThumbsUp /> },
    { key: "neutral", icon: <FaRegMeh /> },
    { key: "dislike", icon: <FaThumbsDown /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 p-8 flex flex-col items-center"
    >
      <div className="max-w-6xl w-full bg-white rounded-xl shadow-2xl p-8 flex flex-col md:flex-row gap-12">
        {/* Left Side */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <h2 className="text-3xl font-extrabold text-indigo-700 text-center md:text-left">
            Interview with <span className="underline">{name || "Candidate"}</span>
          </h2>

          <button
            onClick={() => setShowWebcam((prev) => !prev)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold shadow-md transition-transform active:scale-95"
          >
            {showWebcam ? "Hide Webcam" : "Show Webcam"}
          </button>

          {showWebcam && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg overflow-hidden border-4 border-indigo-300 shadow-lg"
            >
              <Webcam
                ref={webcamRef}
                audio={true}
                screenshotFormat="image/jpeg"
                className="w-full h-auto"
              />
            </motion.div>
          )}

          <div className="flex flex-col gap-4 mt-4">
            {!recordingIndex ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startSpeechRecognition}
                className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md"
              >
                🎤 Speak Answer
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={stopSpeechRecognition}
                className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold shadow-md animate-pulse"
              >
                🛑 Stop Speaking
              </motion.button>
            )}
          </div>

          <div className="flex justify-center gap-8 mt-8 text-4xl text-gray-600 select-none">
            {reactionIcons.map(({ key, icon }) => (
              <motion.button
                key={key}
                onClick={() => handleReaction(key)}
                aria-label={`React with ${key}`}
                whileTap={{ scale: 1.4 }}
                className={`transition-transform duration-300 ${
                  reactions[currentQuestionIndex] === key
                    ? "text-indigo-600 scale-150 drop-shadow-lg"
                    : "hover:text-indigo-400"
                }`}
              >
                {icon}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-2/3 flex flex-col">
          {current ? (
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-indigo-800">
                Q{currentQuestionIndex + 1}: {current.question}
              </h3>

              <textarea
                rows={6}
                className="w-full border-2 border-indigo-300 rounded-lg p-4 text-lg font-medium resize-none focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
                placeholder="Type your answer here..."
                value={answers[currentQuestionIndex] || ""}
                onChange={(e) => handleTextChange(e.target.value)}
              />

              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  ⬅️ Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentQuestionIndex === Question.length - 1}
                  className="px-6 py-3 rounded-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next ➡️
                </button>
              </div>
            </motion.div>
          ) : (
            <p className="text-center text-red-600 text-lg font-semibold">
              No question available.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewQuestionsPage;
