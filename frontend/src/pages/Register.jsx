import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, Check, X } from "lucide-react";
import toast from "react-hot-toast";

import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const passwordChecks = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    special: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]~`';]/.test(
      formData.password
    ),
  };

  const isPasswordValid = Object.values(passwordChecks).every(Boolean);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character."
      );
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", formData);

      toast.success("Registration successful! Please login.");

      navigate("/login");
    } catch (err) {
      console.log("Full error:", err);
      console.log("Response:", err.response);
      console.log("Data:", err.response?.data);

      toast.error(
        err.response?.data?.detail || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const Requirement = ({ passed, children }) => (
    <div
      className={`flex items-center gap-2 text-sm ${
        passed ? "text-green-600" : "text-gray-500"
      }`}
    >
      {passed ? <Check size={16} /> : <X size={16} />}
      <span>{children}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-600 p-4 rounded-full text-white">
            <UserPlus size={28} />
          </div>

          <h1 className="text-3xl font-bold mt-4">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Register to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
          />

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="mt-3 bg-slate-50 rounded-xl p-4 space-y-2">
              <p className="text-sm font-semibold text-slate-700">
                Password Requirements
              </p>

              <Requirement passed={passwordChecks.length}>
                At least 8 characters
              </Requirement>

              <Requirement passed={passwordChecks.uppercase}>
                One uppercase letter
              </Requirement>

              <Requirement passed={passwordChecks.lowercase}>
                One lowercase letter
              </Requirement>

              <Requirement passed={passwordChecks.number}>
                One number
              </Requirement>

              <Requirement passed={passwordChecks.special}>
                One special character
              </Requirement>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-xl py-3 transition disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-green-600 hover:underline"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;