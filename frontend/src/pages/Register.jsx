import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="input w-full border border-gray-300 p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="input w-full border border-gray-300 p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          className="input w-full border border-gray-300 p-3 rounded"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="input w-full border border-gray-300 p-3 rounded"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded transition text-white ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
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
              Registering...
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
};

export default Register;
