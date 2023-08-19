import useCartItems from "../../hooks/useCartItems";
import ssl_commerz from "../../assets/utils/ssl_commerz.png";
import cardVisa from "../../assets/utils/card-visa.png";

const Payments = () => {
  const { allCarts, refetch, isLoading } = useCartItems();

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

  const handlePayment = (allCarts) => {
    
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
            className="radio radio-info radio-sm"
            checked
          />
          <span className="text-gray-600">SSLCOMMERZ (Payment) </span>
          <img className="h-8" src={ssl_commerz} alt="" />
        </div>
        <div className="flex items-center gap-3">
          <input
            readOnly
            type="radio"
            name="radio-7"
            className="radio radio-info radio-sm"
          />
          <span className="text-gray-600">VISA or MASTERCARD </span>
          <img className="h-8" src={cardVisa} alt="card-visa-image" />
        </div>
        <div className="flex items-start mt-5">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs rounded-[3px] "
            required
          />
          <span className="text-gray-600 ml-2 text-sm">
            Yes I have read and agree to the website terms and conditions,
            privacy policy, returns & refunds.
          </span>
        </div>
      </div>
      <div className="mt-8 text-right">
        <button
          onClick={() => handlePayment(allCarts)}
          className="button-primary !bg-red-500 hover:!bg-red-600 duration-200"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payments;
