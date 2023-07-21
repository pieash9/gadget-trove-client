/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import EditProductModal from "../Modal/EditProductModal";
const SellerProductCard = ({ product, refetch }) => {
  const {
    name,
    price,
    image,
    category,
    quantity,
    description,
    createdAt,
    status,
  } = product;

  const [isOpen, setIsOpen] = useState(false); //modal open

  //close modal
  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="rounded overflow-hidden shadow-lg border border-gray-300 pt-6 relative">
      <div
        className="tooltip tooltip-bottom absolute right-4 top-4"
        data-tip="Edit"
      >
        <FaEdit
          onClick={() => setIsOpen(true)}
          className=" text-blue-400 cursor-pointer hover:text-sky-500  duration-500 "
          size={24}
        />
      </div>
      <img className="h-40 mx-auto rounded" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-medium text-gray-600 text-lg mb-2">
          Name: {name}
        </div>

        <p className="text-gray-600 text-sm mb-2">Price: ${price}</p>
        <p className="text-gray-600 text-sm mb-2 capitalize">
          Category: {category}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Quantity available: {quantity}
        </p>
        <p className="text-gray-600 text-sm mb-2">
          Status:{" "}
          <span
            className={`${
              status === "pending"
                ? "bg-yellow-300 rounded px-2 py-1"
                : status === "denied"
                ? " bg-red-500 px-2 py-1 rounded text-white"
                : "bg-green-500 px-2 py-1 rounded text-white"
            } capitalize`}
          >
            {status}
          </span>
        </p>
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
          Product Details: {description}
        </div>
      </div>
      <EditProductModal
        isOpen={isOpen}
        closeModal={closeModal}
        product={product}
        refetch={refetch}
      />
    </div>
  );
};

export default SellerProductCard;
