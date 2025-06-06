import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaTachometerAlt,
  FaUserGraduate,
  FaChartLine,
  FaFileAlt,
  FaBuilding,
  FaUserTie,
  FaLightbulb,
  FaComments,
  FaPaperPlane,
  FaUserCircle,
} from "react-icons/fa";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ChatBot from "../Components/Chatbot";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    {
      path: "",
      label: "Dashboard",
      icon: <FaTachometerAlt className="inline mr-2" />,
    },
    {
      path: "resume-analyzer",
      label: "AI Resume Analyzer",
      icon: <FaUserGraduate className="inline mr-2" />,
    },
    {
      path: "career-roadmap",
      label: "Career Roadmap Generator",
      icon: <FaChartLine className="inline mr-2" />,
    },
    {
      path: "cover-letter",
      label: "Cover Letter Generator",
      icon: <FaFileAlt className="inline mr-2" />,
    },
    {
      path: "company-overview",
      label: "Company Overview with AI",
      icon: <FaBuilding className="inline mr-2" />,
    },
    {
      path: "interview-qa",
      label: "Generate Interview Questions",
      icon: <FaLightbulb className="inline mr-2" />,
    },
    {
      path: "expert-booking",
      label: "Expert Booking",
      icon: <FaUserTie className="inline mr-2" />,
    },
    {
      path: "study-material",
      label: "Study Material",
      icon: <FaPaperPlane className="inline mr-2" />,
    },
  ];

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setUserMenuOpen(false);
    setTimeout(() => {
      navigate("/signup");
    }, 1500);
  };

  return (
    <div className="flex h-screen  shadow">
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-72 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-gray-200">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl cursor-pointer w-full font-bold text-indigo-700 tracking-wide"
          >
            ConnectIQ
          </h1>
          <button
            className="md:hidden text-gray-600 hover:text-indigo-600 transition"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <nav className="mt-8 space-y-4">
          {menuItems.map(({ path, label, icon }) => (
            <NavLink
              key={path}
              to={`/dashboard/${path}`}
              className={({ isActive }) =>
                `flex items-center w-full px-8 py-4 text-left transition-colors duration-200 rounded-r-lg focus:outline-none ${
                  isActive
                    ? "bg-indigo-100 text-indigo-700 font-semibold shadow-md border-r-4 border-indigo-600"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {icon}
              <span className="text-lg">{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 md:hidden relative">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 focus:outline-none"
            aria-label="Open sidebar"
          >
            <FaBars className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-indigo-700">Dashboard</h1>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-indigo-700 text-2xl focus:outline-none"
              aria-label="User menu"
            >
              <FaUserCircle />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border rounded shadow-lg z-50">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <header className="hidden md:flex items-center  justify-end  px-6 py-6 relative">
          <div className="relative flex items-center space-x-2">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="text-indigo-700 text-3xl focus:outline-none"
              aria-label="User menu"
            >
              <FaUserCircle />
            </button>

            <span className="hidden md:inline text-indigo-700 font-semibold select-none">
              Welcome, User
            </span>
          </div>

          {userMenuOpen && (
            <div className="absolute right-4 mt-25 w-40 bg-white border rounded  z-50">
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </header>

        <main className="flex-1 overflow-auto p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50">
          <Outlet />
        </main>
      </div>

      <button
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Chatbot"
      >
        <FaComments className="w-6 h-6" />
      </button>

      {chatOpen && <ChatBot onClose={() => setChatOpen(false)} />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default Dashboard;
