/* eslint-disable react/prop-types */
import useCartItems from "../../hooks/useCartItems";
import ssl_commerz from "../../assets/utils/ssl_commerz.png";
import cardVisa from "../../assets/utils/card-visa.png";
import axios from "axios";
import { useState } from "react";
import StripePaymentModal from "../Modal/StripePaymentModal";

const Payments = ({ formData }) => {
  const { allCarts } = useCartItems();
  const [paymentMethod, setPaymentMethod] = useState("SSLCOMMERZ");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  console.log(paymentMethod);

  // close modal
  const closeModal = () => {
    setIsOpen(false);
  };
  //total cart sum
  const totalPrice = allCarts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  //all cart total price
  const total = allCarts.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = async (allCarts, totalPrice) => {
    if (paymentMethod == "SSLCOMMERZ") {
      const res = await axios.post(`http://localhost:5000/orders`, {
        allCarts,
        totalPrice,
        formData,
      });
      if (res.data) {
        window.location.replace(res.data.url);
      }
    } else {
      setIsOpen(true);
      console.log("stripe");
    }
  };
  return (
    <div className=" my-10 md:w-3/5 mx-auto border p-4 rounded">
      <div className="flex justify-between">
        <h3 className="text-lg text-gray-600 font-medium">PRODUCT</h3>
        <h3 className="text-lg text-gray-600 font-medium">TOTAL</h3>
      </div>
      <div className="border-b pb-3 border-gray-300  w-full"></div>
      <div className="gird grid-cols-1">
        {allCarts &&
          allCarts.length > 0 &&
          allCarts.map((item) => (
            <div
              key={item._id}
              className="group transition-all flex  border-b border-gray-300 py-4 w-full"
            >
              <div className="flex items-center justify-between gap-5 w-full">
                <div className="flex justify-start gap-4 items-center ">
                  {/* set loading for a specific item only */}
                  <div className="relative flex justify-center items-center">
                    <img className="w-14 " src={item.image} alt="" />
                  </div>
                  <h3 className=" font-medium text-gray-600 max-w-xs">
                    <span className="text-sm mr-5">{item?.name}</span> x{" "}
                    {item?.quantity}
                  </h3>
                </div>
                {/* price segment */}
                <div className="text-sky-500 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-between text-sm py-4">
        <p className="grow font-medium text-gray-600">Shipping</p>
        <div className="text-end text-sm">
          <span>Delivery Charge:</span>{" "}
          <span className="text-sky-500 font-medium ">$12</span>
        </div>
      </div>

      <div className="border-b pb-4 border-gray-300  w-full"></div>

      <div className="flex pt-4">
        <span className="grow font-semibold text-gray-600">Total</span>{" "}
        <span className="text-sky-500 font-semibold text-xl">
          {" "}
          ${(total + 12).toFixed(2)}
        </span>
      </div>
      <div className="border-b pb-4 border-gray-300  w-full"></div>

      <h3 className="text-gray-600 font-medium mt-8 text-xl">
        Select a payment method
      </h3>

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex items-center gap-3">
          <input
            readOnly
            type="radio"
            name="radio-7"
            onClick={() => setPaymentMethod("SSLCOMMERZ")}
            className="radio radio-info radio-sm"
            defaultChecked
          />
          <span className="text-gray-600">SSLCOMMERZ (Payment) </span>
          <img className="h-8" src={ssl_commerz} alt="" />
        </div>
        {paymentMethod === "SSLCOMMERZ" && (
          <div className="mt-1">
            <img
              className="w-full"
              src="https://i.ibb.co/4JzBpNv/image.png"
              alt="SSLCOMMERZ"
            />
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            readOnly
            type="radio"
            name="radio-7"
            onClick={() => setPaymentMethod("STRIPE")}
            className="radio radio-info radio-sm"
          />
          <span className="text-gray-600">VISA or MASTERCARD </span>
          <img className="h-8" src={cardVisa} alt="card-visa-image" />
        </div>

        <div className="flex items-start mt-5">
          <input
            onChange={() => setAcceptTerms(!acceptTerms)}
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs rounded-[3px] !accent-pink-500"
            required
          />
          <span className="text-gray-600 ml-2 text-sm">
            Yes I have read and agree to the website terms and conditions,
            privacy policy, returns & refunds.
          </span>
        </div>
        {!acceptTerms && (
          <p className="text-red-500">
            {" "}
            ⬆️ Accept Terms and condition for Payment
          </p>
        )}
      </div>
      <div className="mt-8 text-right">
        <button
          disabled={!acceptTerms}
          onClick={() => handlePayment(allCarts, totalPrice)}
          className="button-primary !bg-red-500 hover:!bg-red-600 duration-200"
        >
          Pay Now{" "}
          {paymentMethod === "SSLCOMMERZ" ? "with SSLCOMMERZ" : "with STRIPE"}
        </button>
      </div>
      <StripePaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        totalPrice={totalPrice}
        formData={formData}
        allCarts={allCarts}
      />
    </div>
  );
};

export default Payments;
