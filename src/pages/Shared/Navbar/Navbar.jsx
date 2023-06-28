import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navLinkClassName = ({ isActive }) =>
    isActive
      ? "text-white font-semibold  bg-gray-700"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium";

  const navItems = (
    <>
      <NavLink
        className={navLinkClassName}
        style={{ backgroundColor: "transparent" }}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={navLinkClassName}
        style={{ backgroundColor: "transparent" }}
        to="/shop"
      >
        Shop
      </NavLink>

      {user ? (
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          onClick={logout}
        >
          Logout
        </NavLink>
      ) : (
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/signUp"
        >
          SignUp
        </NavLink>
      )}
    </>
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-500 sticky top-0 z-50">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h3 className="text-white text-2xl">GadgetTrove</h3>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Navbar items */}
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems}
              </div>
            </div>
          </div>

          {/* Mobile view */}
          <div className="-mr-2 flex md:hidden">
            {/* Hamburger icon */}
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              onClick={toggleDropdown}
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isDropdownOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Navbar items */}
            {navItems}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
