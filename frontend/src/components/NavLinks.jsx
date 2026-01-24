import React from "react";
import { Link, useLocation } from "react-router-dom";
const NavLinks = ({ onClick }) => {
  const location = useLocation();
  return (
    <div className="flex">
      <div>
        <Link onClick={onClick} to="/" className="btn btn-ghost justify-start">
          Home
        </Link>
        {location.pathname === "/" && (
          <div className="border border-b-2 border-primary pb-0" />
        )}
      </div>
      <div>
        <Link
          onClick={onClick}
          to="/expenses"
          className="btn btn-ghost justify-start"
        >
          Expenses
        </Link>
        {location.pathname.startsWith("/expenses") && (
          <div className="border border-b-2 border-primary" />
        )}
      </div>
      <div>
        <Link
          onClick={onClick}
          to="/addexpense"
          className="btn btn-ghost justify-start"
        >
          Add Expense
        </Link>
        {location.pathname.startsWith("/addexpense") && (
          <div className="border border-b-2 border-primary" />
        )}
      </div>
    </div>
  );
};

export default NavLinks;
