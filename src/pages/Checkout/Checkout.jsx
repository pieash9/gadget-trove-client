import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionTitle from "../../components/Title/SectionTitle";
import { FaAddressCard } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import CheckoutAddressForm from "../../components/Form/CheckoutAddressForm";
import { useState } from "react";

const Checkout = () => {
  const [formError, setFormError] = useState(null);
  console.log(formError);

  return (
    <div className="mt-5">
      <SectionTitle title={"Checkout"} />
      <div className="mt-5">
        <Tabs>
          <TabList className="text-center md:w-1/2 mx-auto bg-[#F9F9F9] flex justify-around tabs text-gray-600 py-3 shadow-md hover:shadow-xl duration-500">
            <Tab
              className="font-medium cursor-pointer text-sky-500"
              selectedClassName="text-sky-500"
            >
              <FaAddressCard className="inline mr-2" size={24} /> YOUR ADDRESS
            </Tab>
            <Tab
              disabled
              className="font-medium cursor-pointer"
              selectedClassName="text-sky-500"
            >
              <BsCreditCardFill className="inline mr-2" size={24} /> ORDER &
              PAYMENT
            </Tab>
          </TabList>

          <TabPanel>
            {/* checkout form */}
            <CheckoutAddressForm setFormError={setFormError} />
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Checkout;
