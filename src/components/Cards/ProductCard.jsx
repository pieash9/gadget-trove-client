/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useCartItems from "../../hooks/useCartItems";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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
          <button
            onClick={() => handleAddToCart(_id)}
            className="group-hover:block hidden hover:text-blue-300 duration-1000 uppercase mt-2 text-blue-500 font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
