import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { signUp } from "../services/operations/authApi";
import { toast } from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", form);
    
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    dispatch(signUp(form, navigate))
    dispatch(setSignupData(form))

    setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

  };

  return (
    <section className="h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 via-white to-red-50">
      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-xl space-y-8 border border-gray-200">
        <div className="text-center">
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us and start shopping today!
          </p>
        </div>

        <form
          className="mt-8 space-y-6"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div className="space-y-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-green-600"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showCPassword ? "text" : "password"}
                required
                className="relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowCPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-green-600"
                tabIndex={-1}
                aria-label={showCPassword ? "Hide password" : "Show password"}
              >
                {showCPassword ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-colors duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-green-600 hover:text-green-800 hover:underline transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Signup;
