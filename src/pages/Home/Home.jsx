import Banner from "./Banner";
import HappyCustomer from "./HappyCustomer";
import NewArrivals from "./NewArrivals";
import Products from "./Products";
import ShopByCategory from "./ShopByCategory";
import SoundDevice from "./SoundDevice";
import SuperSale from "./SuperSale";

const Home = () => {
  return (
    <div className="space-y-14">
      <Banner />
      <ShopByCategory />
      <Products />
      <NewArrivals />
      <SuperSale />
      <SoundDevice />
      <HappyCustomer />
    </div>
  );
};

export default Home;
