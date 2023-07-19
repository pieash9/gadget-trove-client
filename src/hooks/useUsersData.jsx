import { useQuery } from "react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsersData = () => {
  const [axiosSecure] = useAxiosSecure();

  const {
    data: allUserData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return { allUserData, refetch, isLoading };
};

export default useUsersData;
