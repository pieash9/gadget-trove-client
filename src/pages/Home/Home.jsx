import Banner from "./Banner";
import Products from "./Products";
import ShopByCategory from "./ShopByCategory";

const Home = () => {
  return (
    <div className="space-y-24">
      <Banner />
      <ShopByCategory />
      <Products />
    </div>
  );
};

export default Home;
