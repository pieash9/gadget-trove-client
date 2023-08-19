import "react-tabs/style/react-tabs.css";
import SectionTitle from "../../components/Title/SectionTitle";
import { FaAddressCard } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import CheckoutAddressForm from "../../components/Form/CheckoutAddressForm";
import Payments from "../../components/utils/Payments";
import { useState } from "react";

const Checkout = () => {
  const [formCompleted, setFormCompleted] = useState(false);
  const [formData, setFormData] = useState("");

  console.log(formData);
  return (
    <div className="mt-5">
      <SectionTitle title={"Checkout"} />
      <div className="mt-5">
        <div className="text-center md:w-1/2 mx-auto bg-[#F9F9F9] flex justify-around tabs text-gray-600 py-3 shadow-md hover:shadow-lg duration-500">
          <button
            onClick={() => setFormCompleted(false)}
            className="font-medium cursor-pointer text-sky-500"
          >
            <FaAddressCard className="inline mr-2" size={24} /> YOUR ADDRESS
          </button>
          <button
            disabled={formCompleted == "false"}
            className={`font-medium cursor-pointer ${
              formCompleted && "text-sky-500"
            }`}
          >
            <BsCreditCardFill className="inline mr-2" size={24} /> ORDER &
            PAYMENT
          </button>
        </div>
        <div className="">
          {!formCompleted && (
            <CheckoutAddressForm
              setFormCompleted={setFormCompleted}
              setFormData={setFormData}
            />
          )}
          {formCompleted && <Payments formData={formData} />}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
