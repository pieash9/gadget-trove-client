import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  // get all category data
  const { data: allCategory } = useQuery("allCategory", async () => {
    const res = await axios(`http://localhost:5000/category`);
    return res.data;
  });

  return (
    <div>
      <div className="divider text-gray-700">Shop by Category</div>

      <div className="flex  items-center justify-around w-full mt-5">
        {allCategory &&
          allCategory.length > 0 &&
          allCategory.map((category) => (
            <Link
              to={`products/${category.category}`}
              className="cursor-pointer flex flex-col justify-center items-center hover:opacity-70"
              key={category._id}
            >
              {" "}
              <img className="mb-2" src={category.image} alt="" width={50} />
              <p className="text-gray-600 text-sm">{category.category} </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
