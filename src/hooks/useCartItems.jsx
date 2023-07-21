import axios from "axios";
import useAuth from "./useAuth";
import { useQuery } from "react-query";

const useCartItems = () => {
  const { user, loading } = useAuth();

  const {
    data: allCarts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allCarts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/allCarts/${user?.email}`
      );
      return res.data;
    },
  });

  return { allCarts, refetch, isLoading };
};

export default useCartItems;
