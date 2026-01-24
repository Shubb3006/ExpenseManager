import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  const location = useLocation();

  const getTranslateClass = () => {
    if (location.pathname === "/") return "translate-x-0";
    if (location.pathname.startsWith("/expenses")) return "translate-x-full";
    if (location.pathname.startsWith("/addexpense"))
      return "translate-x-[200%]";
    return "translate-x-0";
  };

  return (
    <div className="relative">
      {/* Links */}
      <div className="flex">
        <Link onClick={onClick} to="/" className="btn btn-ghost w-32">
          Home
        </Link>
        <Link onClick={onClick} to="/expenses" className="btn btn-ghost w-32">
          Expenses
        </Link>
        <Link onClick={onClick} to="/addexpense" className="btn btn-ghost w-32">
          Add Expense
        </Link>
      </div>

      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 w-full h-[2px]">
        <div
          className={`h-full w-32 bg-primary transition-transform duration-300 ${getTranslateClass()}`}
        />
      </div>
    </div>
  );
};

export default NavLinks;
