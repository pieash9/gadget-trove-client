/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useCartItems from "../../hooks/useCartItems";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { refetch } = useCartItems();
  const [axiosSecure] = useAxiosSecure();
  //   const { description, image, name, ratings, quantity, category, price } =
  //     product;
  const { _id, image, name, ratings, price } = product;

  const handleAddToCart = (_id) => {
    axiosSecure
      .put(`/carts`, {
        price,
        name,
        image,
        ratings,
        productID: _id,
        userEmail: user?.email,
        quantity: 1,
      })
      .then((res) => {
        console.log(res);
        if (res.data.insertedId || res.data.modifiedCount > 0) {
          refetch();
          toast.success("Product added to Cart");
        }
      });
  };
  return (
    <div className="border border-gray-300 rounded p-4 group h-full cursor-pointer flex flex-col justify-center shadow-xl">
      <Link to={`item/${_id}`}>
        <img src={image} alt="" className="h-40 mx-auto" />
        <div className="mt-5">
          <h3 className="text-base font-medium text-gray-700">{name}</h3>
          <p className="flex items-center gap-1 text-base">
            <FaStar className="text-yellow-400" />
            {ratings}/5
          </p>
          <p className="group-hover:hidden block duration-1000 ease-linear  text-gray-600 mt-2">
            ${price}
          </p>
        </div>
      </Link>
      <div className="">
        <button
          onClick={() => handleAddToCart(_id)}
          className="group-hover:block hidden hover:text-blue-300  ease-linear duration-500 uppercase mt-2 text-sky-500 font-medium"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
