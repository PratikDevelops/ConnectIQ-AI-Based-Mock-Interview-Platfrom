import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaRegCheckCircle } from "react-icons/fa";
import SignupIllustration from "./SignupIllustration";

const SignupPage = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    if (isSignup && !name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "At least 6 characters";

    if (isSignup && confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const payload = isSignup
        ? { name, email, password }
        : { email, password };

      const endpoint = isSignup
        ? "http://localhost:4000/api/auth/register"
        : "http://localhost:4000/api/auth/login";

      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data.success) {
          setSubmitted(true);
          setTimeout(() => navigate("/dashboard"), 1500);
        } else {
          setErrors({ form: data.message });
        }
      } catch (error) {
        setErrors({ form: "Something went wrong. Please try again." });
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 flex items-center justify-center px-4"
    >
      <div className="bg-white shadow-2xl rounded-xl max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        <div className="bg-indigo-100 p-6 flex items-center justify-center">
          <div className="w-full h-72 md:h-auto">
            <SignupIllustration />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <h2 className="text-3xl font-bold text-indigo-700 text-center mb-2">
            {isSignup ? "Create Account" : "Welcome Back"}
          </h2>

          {submitted && (
            <div className="text-green-600 text-center font-medium flex items-center justify-center gap-2">
              <FaRegCheckCircle />
              {isSignup ? "Signup" : "Login"} successful! Redirecting...
            </div>
          )}

          {errors.form && (
            <p className="text-red-600 text-center font-medium">
              {errors.form}
            </p>
          )}

          {isSignup && (
            <div>
              <label className="block font-medium mb-1">Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`pl-10 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                    errors.name
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                />
              </div>
              {errors.name && (
                <p className="text-red-600 text-sm">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">Email</label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                  errors.email
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
            </div>
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`pl-10 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-indigo-400"
                }`}
              />
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password}</p>
            )}
          </div>

          {isSignup && (
            <div>
              <label className="block font-medium mb-1">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? "border-red-500 focus:ring-red-400"
                      : "border-gray-300 focus:ring-indigo-400"
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded font-semibold hover:bg-indigo-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

          <div className="text-center mt-4">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              {isSignup ? "Login" : "Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignupPage;
