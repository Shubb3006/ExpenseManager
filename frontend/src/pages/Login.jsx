import { Eye, EyeClosed, Loader, Loader2, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { login, isLoggingIn } = useAuthStore();

  const validateform = () => {
    if (!formData.email.trim()) {
      toast.error("Email is Required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid Email Format");
      return false;
    }
    if (!formData.password.trim()) {
      toast.error("Password is Required");
      return false;
    }
    if (formData.password.trim().length < 6) {
      toast.error("Password must be of min 6 characters");
      return false;
    }

    return true;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const success = validateform();
    if (success) login(formData);
  }
  return (
    <div className="min-h-[calc(100vh-60px)] flex justify-center items-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 sbhadow-2xl">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <div className="form-control">
            <label
              htmlFor=""
              className="input input-bordered flex w-full items-center"
            >
              <Mail />
              <input
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email"
              />
            </label>
          </div>
          <div className="form-control">
            <label
              htmlFor=""
              className="input input-bordered flex w-full items-center"
            >
              <Lock />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
              />
              <button
                type="button"
                onClick={(e) => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeClosed className="w-5 h-5 opacity-70 cursor-pointer" />
                ) : (
                  <Eye className="w-5 h-5 opacity-70 cursor-pointer" />
                )}
              </button>
            </label>
          </div>

          <button
            className="btn btn-primary w-full mt-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <Loader2 className="animate-spin" /> : "Log In"}
          </button>

          <p className="text-center text-sm">
            New User?
            <Link to="/signup" className="link link-primary ml-1">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
