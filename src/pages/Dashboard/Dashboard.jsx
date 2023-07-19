import { NavLink, Outlet } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdAddCircle, MdBorderColor } from "react-icons/md";
import { BsFillPersonFill } from "react-icons/bs";
import logo from "../../assets/logo.png";
import { FaProductHunt } from "react-icons/fa";
const Dashboard = () => {
  //navLink style
  const navLinkClassName = ({ isActive }) =>
    isActive
      ? " font-medium  w-full text-white  bg-blue-500 px-3 py-1 rounded"
      : "text-gray-700 text-white w-full hover:bg-blue-400 font-base px-3 py-1 rounded";

  return (
    <div>
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content m-5">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-circle swap swap-rotate drawer-button lg:hidden"
          >
            <input type="checkbox" />
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
          {/* Page content here */}
          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-48 md:w-64 h-full bg-slate-700 text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col gap-3 text-base">
              <img className="w-20 mx-auto mb-5" src={logo} alt="" />

              <NavLink className={navLinkClassName} to="seller/addProduct">
                <div className="flex items-center">
                  <MdAddCircle className="inline mr-2" size={18} />{" "}
                  <span>Add a Product</span>
                </div>
              </NavLink>
              <NavLink className={navLinkClassName} to="seller/myProducts">
                <div className="flex items-center">
                  {" "}
                  <FaProductHunt className="inline mr-2" size={18} />{" "}
                  <span>My Products</span>
                </div>
              </NavLink>
              <NavLink className={navLinkClassName} to="seller/manageProduct">
                <div className="flex items-center">
                  {" "}
                  <MdBorderColor className="inline mr-2" size={18} />{" "}
                  <span>Order Management</span>
                </div>
              </NavLink>

              <NavLink className={navLinkClassName} to="seller/sellerProfile">
                <div className="flex items-center">
                  {" "}
                  <BsFillPersonFill className="inline mr-2" size={18} />{" "}
                  <span>Profile</span>
                </div>
              </NavLink>
            </div>

            {/* Back to Home */}
            <hr className="bg-white my-4" />

            <div className="flex flex-col gap-3 text-base">
              <NavLink className={navLinkClassName} to="/">
                <div className="flex items-center">
                  <AiFillHome className="inline mr-2" size={18} />{" "}
                  <span>Back to Home</span>
                </div>
              </NavLink>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
