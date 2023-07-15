import { useLoaderData } from "react-router-dom";
import ProductCard from "../Cards/ProductCard";
import EmptyCategoryProducts from "../Empty/EmptyCategoryProducts";

const ShopCategory = () => {
  const categoryProduct = useLoaderData();

  return (
    <>
      {categoryProduct.length === 0 && <EmptyCategoryProducts />}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 my-10">
        {categoryProduct &&
          categoryProduct.length > 0 &&
          categoryProduct.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default ShopCategory;
