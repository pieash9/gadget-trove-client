import AdminProductCard from "../../../components/Cards/AdminProductCard";
import LoadingSpinner from "../../../components/Loader/LoadingSpinner";
import SectionTitle from "../../../components/Title/SectionTitle";
import useAllProductData from "../../../hooks/useAllproductData";

const ManageAllProducts = () => {
  const { allProductData, isLoading, refetch } = useAllProductData();
  return (
    <div>
      <SectionTitle title={"Manage All Products"} />
      {isLoading && <LoadingSpinner />}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {allProductData.length > 0 &&
          allProductData.map((product) => (
            <AdminProductCard
              key={product._id}
              product={product}
              refetch={refetch}
            />
          ))}
      </div>
    </div>
  );
};

export default ManageAllProducts;
