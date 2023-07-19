import { useQuery } from "react-query";
import axios from "axios";

const useAllProductData = () => {
  const {
    data: allProductData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allProductData"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:5000/products`);
      return res.data;
    },
  });

  return { allProductData, refetch, isLoading };
};

export default useAllProductData;
