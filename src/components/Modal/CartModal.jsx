/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartModal = ({
  isOpen,
  closeModal,
  allCarts,
  handleDelete,
  handleUpdateQuantity,
  loadingItemId,
}) => {
  const total = allCarts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto max-w-5xl mx-auto mt-14">
            <div className="flex min-h-full items-start justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    className="absolute right-4 top-4 text-2xl hover:opacity-100 opacity-60 tooltip tooltip-left"
                    data-tip="close"
                    onClick={closeModal}
                  >
                    <AiOutlineClose />
                  </button>
                  <Dialog.Title
                    as="h3"
                    className=" font-medium mb-5 leading-6 text-gray-700 text-center text-2xl"
                  >
                    Cart
                  </Dialog.Title>
                  <div className="mt-2 grid grid-cols-1 gap-5">
                    {allCarts &&
                      allCarts.length > 0 &&
                      allCarts.map((item) => (
                        <div
                          key={item._id}
                          className="group transition-all border rounded p-2 shadow-md hover:shadow-lg duration-300"
                        >
                          <div className="flex items-center gap-5 ">
                            {/* set loading for a specific item only */}
                            <div className="relative flex justify-center items-center">
                              <div className="absolute">
                                {loadingItemId === item._id && (
                                  <span className="loading loading-spinner text-primary "></span>
                                )}
                              </div>
                              <img
                                className={`w-14 duration-500 object-contain ${
                                  loadingItemId === item._id ? "opacity-40" : ""
                                }`}
                                src={item.image}
                                alt=""
                              />
                            </div>
                            <div className="grow">
                              <h3 className="mb-2 font-medium">{item?.name}</h3>
                              <div className="flex justify-between">
                                <div className="">
                                  <button
                                    onClick={() =>
                                      handleUpdateQuantity(item?._id, 1)
                                    }
                                    className="btn btn-info btn-xs rounded-sm px-3 mr-2"
                                  >
                                    {" "}
                                    +{" "}
                                  </button>{" "}
                                  {item?.quantity}{" "}
                                  <button
                                    disabled={item?.quantity === 1}
                                    onClick={() =>
                                      handleUpdateQuantity(item?._id, -1)
                                    }
                                    className="btn btn-info btn-xs rounded-sm px-3 ml-2"
                                  >
                                    {" "}
                                    -{" "}
                                  </button>
                                </div>{" "}
                                <p>x</p>${item?.price}
                              </div>
                            </div>

                            <motion.button
                              initial={{ x: "100", opacity: 0.7 }}
                              whileHover={{ x: "0", opacity: 1 }}
                              transition={{ duration: 1 }}
                              onClick={() => handleDelete(item._id)}
                              className="cursor-pointer text-opacity-0 group-hover:text-opacity-100 text-red-500 text-3xl font-medium   duration-700 "
                            >
                              x
                            </motion.button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between mt-10">
                    <p className="text-lg text-gray-700 font-medium">
                      SubTotal
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                      ${total.toFixed(2)}
                    </p>
                  </div>

                  <div className="mt-4 text-center flex flex-col gap-3">
                    <Link to="/checkout">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="button-primary w-full"
                      >
                        Checkout
                      </button>
                    </Link>
                    <Link to="/cart">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="button-secondary w-full"
                      >
                        View Cart
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default CartModal;
