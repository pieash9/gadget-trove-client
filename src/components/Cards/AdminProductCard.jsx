/* eslint-disable react/prop-types */

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { toast } from "react-hot-toast";
import ReadMore from "../utils/ReadMore";

const AdminProductCard = ({ product, refetch }) => {
  const [changeProductStatus, setChangeProductStatus] = useState(false);
  //   const [isReadMore, setIsReadMore] = useState(true);
  const [axiosSecure] = useAxiosSecure();
  const {
    _id,
    name,
    price,
    image,
    category,
    quantity,
    description,
    createdAt,
    status,
  } = product;

  //   change product status
  const handleProductStatus = (productStatus, id) => {
    axiosSecure
      .patch(`/changeProductStatus/${id}`, { status: productStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          toast.success("Status Updated");
        }
      });
  };

  const handleDeleteProduct = (id) => {
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
          .delete(`/products/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              console.log(res.data);
              toast.success("Product deleted");
            }
          })
          .catch(() => toast.error("Something went wrong"));
      }
    });
  };
  return (
    <>
      <div className="rounded overflow-hidden shadow-lg border border-gray-300 pt-6 relative">
        {/* delete Product  */}
        <div
          className="tooltip tooltip-bottom  absolute top-4 right-4"
          data-tip="Delete"
        >
          <FaTrash
            onClick={() => handleDeleteProduct(_id)}
            className=" text-red-400 cursor-pointer hover:text-red-500  duration-300 "
            size={20}
          />
        </div>
        <img className="h-40 mx-auto rounded" src={image} alt={name} />
        <div className="px-6 py-4">
          <div className="font-medium text-gray-600 text-lg mb-2">
            Name: {name}
          </div>

          <p className="text-gray-600 text-sm mb-2">
            Price: <span className="text-sky-500">${price}</span>
          </p>
          <p className="text-gray-600 text-sm mb-2 capitalize">
            Category: {category}
          </p>
          <p className="text-gray-600 text-sm mb-2">
            Quantity available: {quantity}
          </p>
          <div className="flex items-center gap-5">
            {" "}
            <p className="text-gray-600 text-sm mb-2 flex items-center ">
              Status:{" "}
              <span
                className={`${
                  status === "pending"
                    ? "bg-yellow-300 rounded px-2 py-1"
                    : status === "denied"
                    ? " bg-red-500 px-2 py-1 rounded text-white"
                    : "bg-green-500 px-2 py-1 rounded text-white"
                } capitalize ml-2`}
              >
                {status}
              </span>
              <span
                className="tooltip tooltip-top ml-10"
                data-tip="Change status"
              >
                <FaEdit
                  onClick={() => setChangeProductStatus(!changeProductStatus)}
                  className=" text-blue-400 cursor-pointer hover:text-sky-500  duration-300 "
                  size={20}
                />
              </span>
            </p>
          </div>
          {changeProductStatus && (
            <div className="flex gap-2 py-2 text-sm flex-wrap">
              <button
                disabled={status === "approved"}
                onClick={() => handleProductStatus("approved", _id)}
                className={` text-green-400 bg-base-100 rounded px-2 py-px font-medium cursor-pointer inline hover:scale-95 duration-300 disabled:bg-gray-400 disabled:text-white border border-gray-400 ${
                  status === "approved" && "cursor-not-allowed"
                }`}
              >
                Approved
              </button>
              <button
                disabled={status === "pending"}
                onClick={() => handleProductStatus("pending", _id)}
                className={`text-yellow-500 bg-base-100 rounded px-2 py-px font-medium cursor-pointer inline hover:scale-95 duration-300 disabled:bg-gray-400 disabled:text-white border border-gray-400  ${
                  status === "pending" && "cursor-not-allowed"
                }`}
              >
                Pending
              </button>
              <button
                disabled={status === "denied"}
                onClick={() => handleProductStatus("denied", _id)}
                className={` text-red-500 bg-base-100  rounded px-2 py-px font-medium cursor-pointer inline hover:scale-95 duration-300 disabled:bg-gray-400 disabled:text-white border border-gray-400 ${
                  status === "denied" && "cursor-not-allowed"
                }`}
              >
                Denied
              </button>
            </div>
          )}
          <p className="text-gray-600 text-sm mb-2">
            Created At:{" "}
            {`${new Date(createdAt).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
            })} ${new Date(createdAt).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })} `}
          </p>
          <div className="text-gray-600 text-sm mb-2">
            Product Details: <ReadMore description={description} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProductCard;
