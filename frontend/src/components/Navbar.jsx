import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Menu, X } from "lucide-react";
import NavLinks from "./NavLinks";
import LogoutModal from "./modals/LogoutModal";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { authUser } = useAuthStore();
  const [isLogout, setIsLogout] = useState(false);
  const [showNav, setShowNav] = useState(false);

  function handleLogout() {
    setIsLogout(true);
  }

  const location = useLocation();
  const getTranslateClass = () => {
    if (location.pathname === "/") return "translate-x-[19%]";
    if (location.pathname.startsWith("/expenses")) return "translate-x-[118%]";
    if (location.pathname.startsWith("/addexpense"))
      return "translate-x-[219%]";
    return "translate-x-0";
  };

  return (
    <div className="bg-base-100 py-2 shadow-md px-6 sticky top-0 z-1 flex flex-col">
      {/* Left */}
      <div className="flex">
        <button
          aria-label="show Navbar"
          className="block sm:hidden flex-1"
          onClick={() => setShowNav(!showNav)}
        >
          {" "}
          {showNav ? <X /> : <Menu />}
        </button>

        <div className="flex-1 gap-4">
          <div className="hidden sm:block relative w-fit">
            <NavLinks />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-base-300">
          <div
            className={`hidden sm:block h-full w-32 bg-primary transition-all duration-300 ${getTranslateClass()}`}
          />
        </div>

        {/* Right */}
        <div className="flex sm:gap-10 gap-4">
          <ThemeToggle />
          <div className="ml-auto">
            {!authUser ? (
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            ) : (
              <button
                aria-label="logout button"
                onClick={handleLogout}
                className="btn btn-error"
              >
                Logout
              </button>
            )}
          </div>
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
