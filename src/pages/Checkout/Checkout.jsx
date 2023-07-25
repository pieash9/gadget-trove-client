import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Checkout = () => {
  return (
    <div>
      <Tabs>
        <TabList className="text-center md:w-3/4 mx-auto bg-[#F9F9F9] flex justify-around">
          <Tab>YOUR ADDRESS</Tab>
          <Tab>ORDER & PAYMENT</Tab>
        </TabList>

        <TabPanel>
          <h2>Any content 1</h2>
        </TabPanel>
        <TabPanel>
          <h2>Any content 2</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Checkout;
