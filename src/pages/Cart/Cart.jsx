import { toast } from "react-hot-toast";
import SectionTitle from "../../components/Title/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCartItems from "../../hooks/useCartItems";
import { motion } from "framer-motion";
import { useState } from "react";
import Loader from "../../components/Loader/Loader";

const Cart = () => {
  const { allCarts, refetch, isLoading } = useCartItems();
  const [loadingItemId, setLoadingItemId] = useState(null);
  const [axiosSecure] = useAxiosSecure();

  // update cart item quantity
  const handleUpdateQuantity = (id, quantityValue) => {
    setLoadingItemId(id);
    axiosSecure.patch(`/carts/${id}?quantity=${quantityValue}`).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        setLoadingItemId(null);
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

  //total cart sum
  const totalPrice = allCarts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  //loading spinner
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* section title */}
      <SectionTitle title={"Cart"} />
      <div className="md:flex  gap-10 md:px-5 my-10">
        <div className="mt-2 grid grid-cols-1 md:w-2/3">
          {/* cart item title */}
          <div className="flex items-center gap-5">
            <div className="md:w-3/5 ">
              <h3 className="text-gray-600 text-center font-semibold">
                PRODUCT
              </h3>
            </div>
            <div className="md:w-2/5 grid grid-cols-3 gap-10">
              <h3 className="text-gray-600 text-center font-semibold">
                PRICE{" "}
              </h3>
              <h3 className="text-gray-600 text-center font-semibold">
                QUANTITY
              </h3>
              <h3 className="text-gray-600 text-center font-semibold">
                SUBTOTAL
              </h3>
            </div>
          </div>
          <div className="border-b pb-3 border-gray-300  w-full"></div>
          {allCarts &&
            allCarts.length > 0 &&
            allCarts.map((item) => (
              <div
                key={item._id}
                className="group transition-all flex  border-b border-gray-300 py-4 w-full"
              >
                <div className="flex items-center gap-5 w-full">
                  <div className="flex justify-start gap-7 items-center md:w-3/5">
                    <div className="">
                      <motion.button
                        initial={{ x: "100", opacity: 0.7 }}
                        whileHover={{ x: "0", opacity: 1 }}
                        transition={{ duration: 1 }}
                        onClick={() => handleDelete(item._id)}
                        className="cursor-pointer text-red-400 hover:text-red-500 text-xl font-medium   duration-1000 "
                      >
                        x
                      </motion.button>
                    </div>
                    {/* set loading for a specific item only */}
                    <div className="relative flex justify-center items-center">
                      <div className="absolute">
                        {loadingItemId === item._id && (
                          <span className="loading loading-spinner text-primary "></span>
                        )}
                      </div>
                      <img
                        className={`w-14 duration-500 ${
                          loadingItemId === item._id ? "opacity-40" : ""
                        }`}
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <h3 className=" font-medium text-gray-600">{item?.name}</h3>
                  </div>

                  {/* price segment */}
                  <div className="grid grid-cols-3 gap-10 md:w-2/5">
                    <div className="text-gray-500 text-sm">
                      ${item?.price.toFixed(2)}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <button
                        onClick={() => handleUpdateQuantity(item?._id, 1)}
                        className="btn btn-info btn-xs rounded-sm px-3 mr-2"
                      >
                        {" "}
                        +{" "}
                      </button>{" "}
                      {item?.quantity}{" "}
                      <button
                        disabled={item?.quantity === 1}
                        onClick={() => handleUpdateQuantity(item?._id, -1)}
                        className="btn btn-info btn-xs rounded-sm px-3 ml-2"
                      >
                        {" "}
                        -{" "}
                      </button>
                    </div>

                    <div className="text-blue-500 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="md:w-1/3 border border-gray-300 rounded p-5">
          CART TOTALS
        </div>
      </div>
    </>
  );
};

export default Cart;
