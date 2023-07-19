import SectionTitle from "../../../components/Title/SectionTitle";
import { useQuery } from "react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import SellerProductCard from "../../../components/Cards/SellerProductCard";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";

const MyProducts = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const {
    data: sellerProducts = [],
    refetch,
    isLoading,
  } = useQuery(`${user?.email}`, async () => {
    const res = await axiosSecure.get(`/sellerProducts/${user?.email}`);
    return res?.data;
  });
  console.log(sellerProducts);
  return (
    <div>
      <SectionTitle title={"My Products"} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {isLoading && <LoadingSpinner />}
        {sellerProducts.length > 0 &&
          sellerProducts.map((product) => (
            <SellerProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default MyProducts;
