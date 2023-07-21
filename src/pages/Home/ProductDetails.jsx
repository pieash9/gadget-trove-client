import { useLoaderData } from "react-router-dom";
import ReactImageZoom from "react-image-zoom";
const ProductDetails = () => {
  const product = useLoaderData();
  const { name, price, image, category, quantity, description } = product;
  console.log(product);
  const zoomProps = {
    width: 256,
    zoomWidth: 320,
    zoomPosition: "original",
    img: image,
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row">
          <div className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-md cursor-pointer">
            <ReactImageZoom {...zoomProps} />
          </div>

          <div className="md:ml-8">
            <h2 className="text-2xl font-medium mb-4">{name}</h2>
            <p className="text-lg font-medium mb-2">
              Price: <span className="text-blue-500">${price}</span>
            </p>
            <p className="text-lg font-medium mb-2">
              Category: <span className="text-slate-500">{category}</span>
            </p>
            <p className="text-lg font-medium mb-2">In stock: {quantity}</p>
            <p className="text-lg mb-4">
              <p className="text-gray-700 font-medium">Details:</p>{" "}
              {description}
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
