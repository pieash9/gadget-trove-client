import { useQuery } from "react-query";
import axios from "axios";
import ProductCard from "../../components/Cards/ProductCard";
import Loader from "../../components/Loader/Loader";

const Products = () => {
  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products`);
      return res.data;
    },
  });
  return (
    <div>
      {isLoading && <Loader />}

      <div className="flex items-center">
        <h3 className="text-gray-700 text-xl my-2">All Gadgets</h3>
        <hr className="flex-grow ml-4 border-gray-300" />
      </div>
      <p className="text-gray-500 mb-5 text-sm ">Exclusive Collection</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {allProducts &&
          allProducts.length > 0 &&
          allProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
