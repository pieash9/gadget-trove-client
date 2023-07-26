import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import SectionTitle from "../../components/Title/SectionTitle";
import { FaAddressCard } from "react-icons/fa";
import { BsCreditCardFill } from "react-icons/bs";
import CartAddressForm from "../../components/Form/CartAddressForm";

const Checkout = () => {
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
              <FaAddressCard className="inline mr-2" size={24}/> YOUR ADDRESS
            </Tab>
            <Tab
              className="font-medium cursor-pointer"
              selectedClassName="text-sky-500"
            >
            <BsCreditCardFill className="inline mr-2" size={24}/>  ORDER & PAYMENT
            </Tab>
          </TabList>

          <TabPanel>
           <CartAddressForm/>
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
