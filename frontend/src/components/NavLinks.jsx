import React from "react";
import { Link } from "react-router-dom";
const NavLinks = () => (
  <>
    <Link to="/" className="btn btn-ghost justify-start">
      Home
    </Link>
    <Link to="/expenses" className="btn btn-ghost justify-start">
      Expenses
    </Link>
    <Link to="/addexpense" className="btn btn-ghost justify-start">
      Add Expense
    </Link>
  </>
);

export default NavLinks;
