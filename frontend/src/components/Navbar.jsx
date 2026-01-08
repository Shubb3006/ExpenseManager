import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import LogoutModal from "./LogoutModaL.JSX";

const Navbar = () => {
  const { authUser, checkAuth } = useAuthStore();
  const [isLogout, setIsLogout] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  function handleLogout() {
    setIsLogout(true);
  }

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-1">
      {/* Left */}
      <div className="flex-1 gap-4">
        <Link to="/" className="btn btn-ghost text-lg font-semibold">
          Home
        </Link>
        <Link to="/expenses" className="btn btn-ghost text-lg font-semibold">
          Expenses
        </Link>
        <Link to="/addexpense" className="btn btn-ghost text-lg font-semibold">
          Add Expense
        </Link>
      </div>

      {/* Right */}
      <div className="flex-none">
        {!authUser ? (
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="btn btn-error">
            Logout
          </button>
        )}
      </div>

      {isLogout && <LogoutModal setIsLogout={setIsLogout} />}
    </div>
  );
};

export default Navbar;
