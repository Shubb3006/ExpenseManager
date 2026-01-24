import React from "react";
import { Link } from "react-router-dom";

const NavLinks = ({ onClick }) => {
  return (
    <div className="flex">
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
    </div>
  );
};

export default NavLinks;
