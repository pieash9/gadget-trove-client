/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import { motion } from "framer-motion";

const CartModal = ({
  isOpen,
  closeModal,
  allCarts,
  handleDelete,
  handleUpdateQuantity,
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
                  <Dialog.Title
                    as="h3"
                    className=" font-medium leading-6 text-gray-900 text-center text-2xl"
                  >
                    Cart
                  </Dialog.Title>
                  <div className="mt-2 grid grid-cols-1 gap-5">
                    {allCarts &&
                      allCarts.length > 0 &&
                      allCarts.map((item) => (
                        <div key={item._id} className="group transition-all">
                          <div className="flex items-center gap-5">
                            <img className="w-20" src={item.image} alt="" />
                            <div className="grow">
                              <h3 className="mb-2">{item?.name}</h3>
                              <div className="flex justify-between">
                                <div>
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

                            {/* <motion.button
                              initial={{ x: "100%", opacity: 0 }}
                              whileHover={{ x: "0", opacity: 1 }}
                              transition={{duration:1.5}}
                              onClick={() => handleDelete(item._id)}
                              className="cursor-pointer hidden hover:text-gray-400 group-hover:block text-xl font-semibold hover:transition hover:duration-[2000ms] "
                            >
                              x
                            </motion.button> */}
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="cursor-pointer hidden hover:text-gray-400 group-hover:block text-xl font-semibold hover:transition hover:duration-[2000ms] "
                            >
                              x
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>

                  <div className="flex justify-between mt-4">
                    <p className="text-lg">SubTotal</p>
                    <p className="text-xl font-semibold">${total.toFixed(2)}</p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
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
