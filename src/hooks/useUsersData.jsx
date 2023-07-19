import { useQuery } from "react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUsersData = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();

  const { data: allUserData = [], refetch } = useQuery({
    queryKey: ["allUsers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  return { allUserData, refetch };
};

export default useUsersData;
