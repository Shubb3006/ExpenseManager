import { Mail, User, Lock, Eye, EyeClosed, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signup, isSigningUp } = useAuthStore();

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
    if (success) signup(formData);

    setFormData({ email: "", password: "", name: "" });
  }
  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          {/* Email */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 w-full ">
              <Mail className="w-5 h-5 opacity-70" />
              <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
                placeholder="Email"
                className="grow"
              />
            </label>
          </div>

          {/* Name */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <User className="w-5 h-5 opacity-70" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
                placeholder="Name"
                className="grow"
              />
            </label>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <Lock className="w-5 h-5 opacity-70" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
                placeholder="Password"
                className="grow"
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
            disabled={isSigningUp}
          >
            {isSigningUp ? <Loader2 className="animate-spin" /> : "Sign Up"}
          </button>

          <p className="text-center text-sm">
            Already have an account?
            <Link to="/login" className="link link-primary ml-1">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
