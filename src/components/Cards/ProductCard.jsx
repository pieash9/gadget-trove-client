/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
const ProductCard = ({ product }) => {
//   const { description, image, name, ratings, quantity, category, price } =
//     product;
  const {  image, name, ratings, price } =
    product;
  return (
    <div className="border rounded p-4 group h-full cursor-pointer">
      <img src={image} alt="" className="h-48 mx-auto" />
      <div className="mt-5">
        <h3 className="text-lg font-medium text-gray-700">{name}</h3>
        <p className="flex items-center gap-1 text-base">
          <FaStar className="text-yellow-400" />
          {ratings}/5
        </p>
        <p className="group-hover:hidden block duration-1000  text-gray-600 mt-2">
          ${price}
        </p>
        <div className="">
          <button className="group-hover:block hidden hover:text-blue-300 duration-1000 uppercase mt-2 text-blue-500 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
