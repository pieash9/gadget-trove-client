/* eslint-disable react/prop-types */
import Swal from "sweetalert2";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

/* eslint-disable no-unused-vars */
const UserCard = ({ user, refetch }) => {
  const { _id, name, email, image, role, createdAt } = user;
  const [changeRole, setChangeRole] = useState(false);
  const [axiosSecure] = useAxiosSecure();

  //   change user role
  const handleUserRole = (userRole, id) => {
    axiosSecure.patch(`/users/${id}`, { role: userRole }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success("User role updated");
      }
    });
  };

  //   delete user
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              console.log(res.data);
              toast.success("User deleted");
            }
          })
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };

  return (
    <div className=" rounded overflow-hidden shadow-lg border border-gray-300 bg-white relative">
      {/* delete user btn  */}
      <div
        className="tooltip tooltip-bottom  absolute top-4 right-5"
        data-tip="Delete"
      >
        <FaTrash
          onClick={() => handleDeleteUser(_id)}
          className=" text-red-400 cursor-pointer hover:text-red-500  duration-300 "
          size={20}
        />
      </div>
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="px-5 py-4">
        <div className="font-medium text-lg mb-2 text-gray-600">{name}</div>
        <p className="text-gray-600 text-sm mb-2">Email: {email}</p>
        <p className="text-gray-600 text-sm mb-2 flex items-center ">
          Role:{" "}
          <span
            className={`${
              role === "seller"
                ? "bg-yellow-300 rounded px-2 py-px"
                : role === "admin"
                ? " bg-red-500 px-2 py-px rounded text-white"
                : "bg-blue-500 px-2 py-px rounded text-white"
            } capitalize font-thin mr-10 ml-2`}
          >
            {role}{" "}
          </span>
          <span className="tooltip tooltip-top " data-tip="Set role">
            <FaEdit
              onClick={() => setChangeRole(!changeRole)}
              className=" text-blue-400 cursor-pointer hover:text-blue-500  duration-300 "
              size={20}
            />
          </span>
        </p>

        {changeRole && (
          <div className="flex gap-2 py-2 text-sm">
            <button
              disabled={role === "admin"}
              onClick={() => handleUserRole("admin", _id)}
              className={` text-red-400 font-medium rounded px-2 py-px cursor-pointer inline hover:scale-95 duration-300 hover:bg-blue-200 disabled:bg-gray-400 disabled:text-white border border-gray-400 ${
                role === "admin" && "cursor-not-allowed"
              }`}
            >
              Admin
            </button>
            <button
              disabled={role === "seller"}
              onClick={() => handleUserRole("seller", _id)}
              className={`text-purple-500 font-medium rounded px-2 py-px cursor-pointer inline hover:scale-95 duration-300 hover:bg-blue-200 disabled:bg-gray-400 disabled:text-white border border-gray-400  ${
                role === "seller" && "cursor-not-allowed"
              }`}
            >
              Seller
            </button>
            <button
              disabled={role === "user"}
              onClick={() => handleUserRole("user", _id)}
              className={` text-blue-500 font-medium rounded px-2 py-px cursor-pointer inline hover:scale-95 duration-300 hover:bg-blue-200 disabled:bg-gray-400 disabled:text-white border border-gray-400 ${
                role === "user" && "cursor-not-allowed"
              }`}
            >
              User
            </button>
          </div>
        )}

        <p className="text-gray-600 text-sm">
          Joined:{" "}
          {`${new Date(createdAt).toLocaleTimeString([], {
            hour: "numeric",
            minute: "numeric",
          })} ${new Date(createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })} `}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
