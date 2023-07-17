import { useState } from "react";
import { NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import useCartItems from "../../../hooks/useCartItems";
import CartModal from "../../../components/Modal/CartModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { allCarts, refetch } = useCartItems();
  const [isOpen, setIsOpen] = useState(false);
  const [axiosSecure] = useAxiosSecure();

  const closeModal = () => {
    setIsOpen(false);
  };
  // update cart item quantity
  const handleUpdateQuantity = (id, quantityValue) => {
    console.log(id, quantityValue);

    axiosSecure.patch(`/carts/${id}?quantity=${quantityValue}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
      }
    });
  };

  //delete cart data
  const handleDelete = (id) => {
    axiosSecure.delete(`/carts/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        refetch();
        return toast.success("Item removed");
      }
    });
  };

  const navLinkClassName = ({ isActive }) =>
    isActive
      ? "text-white font-semibold  bg-gray-700  py-1 border-b-2"
      : "text-gray-300 hover:bg-gray-700 hover:text-white py-1  font-medium";

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
      <NavLink
        className={navLinkClassName}
        style={{ backgroundColor: "transparent" }}
        to="/contact"
      >
        Contact
      </NavLink>
      <NavLink
        className={navLinkClassName}
        style={{ backgroundColor: "transparent" }}
        to="/dashboard"
      >
        Dashboard
      </NavLink>
    </>
  );

  // nav image and login logout
  const navImageLogout = (
    <>
      <NavLink
        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium"
        style={{ backgroundColor: "transparent" }}
      >
        {user?.photoURL ? (
          <div
            className="avatar tooltip tooltip-bottom "
            data-tip={user?.displayName}
          >
            <div className="w-8 rounded-full">
              <img src={user?.photoURL} />
            </div>
          </div>
        ) : (
          <FaRegUserCircle size={24} />
        )}
      </NavLink>

      <div className="px-3 relative">
        <div className="badge badge-primary text-xs absolute -mt-3 -right-2 ">
          {/* cart length  */}

          {allCarts?.length}
        </div>
        <FaShoppingCart
          onClick={() => setIsOpen(true)}
          size={20}
          className="text-white cursor-pointer"
        />
      </div>

      {user ? (
        <NavLink
          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium "
          style={{ backgroundColor: "transparent" }}
          onClick={logout}
        >
          Logout
        </NavLink>
      ) : (
        <NavLink
          className={navLinkClassName}
          style={{ backgroundColor: "transparent" }}
          to="/login"
        >
          Login
        </NavLink>
      )}
    </>
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-gray-700 sticky top-0 z-50">
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
              <div className="ml-10 flex items-center gap-7">
                {navItems}
              </div>
            </div>
          </div>
          <div className="ml-10 flex items-center  space-x-4">
            {navImageLogout}
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
      <CartModal
        isOpen={isOpen}
        closeModal={closeModal}
        allCarts={allCarts}
        handleDelete={handleDelete}
        handleUpdateQuantity={handleUpdateQuantity}
      />
    </nav>
  );
};

export default Navbar;
