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
  console.log(allProducts);
  return (
    <div>
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
