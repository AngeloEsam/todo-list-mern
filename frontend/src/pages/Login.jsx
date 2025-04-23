import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setError(null);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br  from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl transition-transform hover:scale-[1.01]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm border border-red-300">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute top-4 left-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-4 left-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 font-semibold text-white rounded-lg transition-all duration-300 ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 font-semibold hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
