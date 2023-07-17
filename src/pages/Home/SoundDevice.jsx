import { useQuery } from "react-query";
import SectionTitle from "../../components/Title/SectionTitle";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import axios from "axios";
import ProductCard from "../../components/Cards/ProductCard";

const SoundDevice = () => {
  // Earbuds Category Data
  const { data: categoryEarBuds = [] } = useQuery(
    "CategoryEarBuds",
    async () => {
      const res = await axios.get(`http://localhost:5000/products/earBuds`);
      return res.data;
    }
  );

  // Speakers Category Data
  const { data: categorySpeakers = [] } = useQuery(
    "CategorySpeakers",
    async () => {
      const res = await axios.get(`http://localhost:5000/products/speakers`);
      return res.data;
    }
  );

  // Headphones Category Data
  const { data: categoryHeadphones = [] } = useQuery(
    "CategoryHeadphones",
    async () => {
      const res = await axios.get(`http://localhost:5000/products/headphones`);
      return res.data;
    }
  );

  return (
    <div>
      <SectionTitle title={"Sound Devices"} subtitle={"High Quality Sounds"} />

      <div className="flex gap-5">
        <div className="md:w-1/5">
          <img className="h-96 rounded" src="https://i.ibb.co/nM7X8HN/image.png" alt="" />
        </div>
        {/* React tabs */}
        <Tabs className="md:w-4/5">
          <TabList className="flex gap-5 items-center text-gray-600  ">
            <Tab
              className=" font-medium text-lg cursor-pointer"
              selectedClassName="text-blue-500"
            >
              EARBUDS
            </Tab>
            <Tab
              className=" font-medium text-lg cursor-pointer"
              selectedClassName="text-blue-500"
            >
              HEADPHONES
            </Tab>
            <Tab
              className=" font-medium text-lg cursor-pointer"
              selectedClassName="text-blue-500"
            >
              SPEAKER
            </Tab>
          </TabList>
          <hr className="h-[2px] bg-slate-300" />

          <TabPanel>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5">
              {categoryEarBuds &&
                categoryEarBuds.length > 0 &&
                categoryEarBuds.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {categoryHeadphones &&
                categoryHeadphones.length > 0 &&
                categoryHeadphones.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5">
              {categorySpeakers &&
                categorySpeakers.length > 0 &&
                categorySpeakers.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default SoundDevice;
