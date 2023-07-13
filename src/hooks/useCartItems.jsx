import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "react-query";

const useCartItems = () => {
  const { user, loading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: allCarts = [], refetch } = useQuery({
    queryKey: ["allCarts", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/allCarts/${user?.email}`);
      return res.data;
    },
  });

  return { allCarts, refetch };
};

export default useCartItems;
