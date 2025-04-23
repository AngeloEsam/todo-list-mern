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

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Name"
          className="input"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="input"
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          className="input"
          onChange={handleChange}
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          className="input"
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
