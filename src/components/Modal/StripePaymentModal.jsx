/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import { AiOutlineClose } from "react-icons/ai";
import StripePaymentForm from "../Form/StripePaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  `pk_test_51NEP7bJeWcjfeLF6Qy9S41FNE8Rkpg3uN5YBbssaE3QwaN0DCJITyycHYPV4SyUfU5OxwZ6DHo8cBaCrbZYnvP6000852aWwd5`
);

console.log(stripePromise);

const StripePaymentModal = ({
  isOpen,
  closeModal,
  totalPrice,
  allCarts,
  formData,
}) => {
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

          <div className="fixed inset-0 overflow-y-auto max-w-5xl mx-auto mt-20">
            <div className="flex min-h-full items-start justify-center p-4 text-center">
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
                    Pay Now
                  </Dialog.Title>
                  {/* Payment form */}
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm
                      totalPrice={totalPrice}
                      formData={formData}
                      allCarts={allCarts}
                    />
                  </Elements>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default StripePaymentModal;
