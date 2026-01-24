import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  const location =useLocation();
  return (
    <div className="flex">
     
        <Link onClick={onClick} to="/" className={`btn btn-ghost w-32 text-lg ${location.pathname==="/" ? "text-primary":"text-base-content"}`}>
         Home
        </Link>
        <Link onClick={onClick} to="/expenses" className={`btn btn-ghost w-32 text-lg ${location.pathname.startsWith("/expenses") ?"text-primary":"text-base-content"}`}>
          Expenses
        </Link>
        <Link onClick={onClick} to="/addexpense" className={`btn btn-ghost w-40 text-lg ${location.pathname.startsWith("/addexpense") ? "text-primary":"text-base-content"}`}>
          Add Expense
        </Link>
    </div>
  );
};

export default NavLinks;
