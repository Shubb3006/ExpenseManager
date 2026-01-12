import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import LogoutModal from "./modals/LogoutModal";

const Navbar = () => {
  const { authUser, checkAuth } = useAuthStore();
  const [isLogout, setIsLogout] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  function handleLogout() {
    setIsLogout(true);
  }

  return (
    <div className="bg-base-100 py-2 shadow-md px-6 sticky top-0 z-1 flex flex-col">
      {/* Left */}
      <div className="flex">
        <button
          className="block sm:hidden flex-1"
          onClick={() => setShowNav(!showNav)}
        >
          {" "}
          {showNav ? <X /> : <Menu />}
        </button>

        <div className="flex-1 gap-4">
          <div className="hidden sm:block">
            <NavLinks />
          </div>
        </div>

        {/* Right */}
        <div className="ml-auto">
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
      </div>

      {showNav && (
        <div className="sm:hidden mt-3 flex justify-center">
          <NavLinks onClick={() => setShowNav(false)} />
        </div>
      )}

      {isLogout && <LogoutModal setIsLogout={setIsLogout} />}
    </div>
  );
};

export default Navbar;
