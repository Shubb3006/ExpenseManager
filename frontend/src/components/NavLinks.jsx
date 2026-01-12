import React from "react";
import { Link } from "react-router-dom";
const NavLinks = ({ onClick }) => (
  <>
    <Link onClick={onClick} to="/" className="btn btn-ghost justify-start">
      Home
    </Link>
    <Link
      onClick={onClick}
      to="/expenses"
      className="btn btn-ghost justify-start"
    >
      Expenses
    </Link>
    <Link
      onClick={onClick}
      to="/addexpense"
      className="btn btn-ghost justify-start"
    >
      Add Expense
    </Link>
  </>
);

export default NavLinks;
