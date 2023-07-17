import axios from "axios";
import { useQuery } from "react-query";
import ProductCard from "../../components/Cards/ProductCard";

const SuperSale = () => {
  const { data: superSaleProducts = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products`);
      return res.data;
    },
  });
  return (
    <div>
      <div className="flex items-center">
        <h3 className="text-gray-700 text-xl my-2">
          <span className="text-red-500">Super</span> Sale
        </h3>
        <hr className="flex-grow ml-4 border-gray-300" />
      </div>
      <p className="text-gray-500 mb-5 text-sm ">Best Price Guarantee</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {superSaleProducts &&
          superSaleProducts.length > 0 &&
          superSaleProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default SuperSale;
