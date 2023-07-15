import axios from "axios";
import { useQuery } from "react-query";
import ProductCard from "../../components/Cards/ProductCard";
import SectionTitle from "../../components/Title/SectionTitle";

const NewArrivals = () => {
  const { data: newProducts = [] } = useQuery("newProduct", async () => {
    const res = await axios.get(`http://localhost:5000/newProducts`);
    return res?.data;
  });

  return (
    <div>
      <SectionTitle title={"New Arrivals"} subtitle={"Latest Products"} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {newProducts &&
          newProducts.length > 0 &&
          newProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default NewArrivals;
