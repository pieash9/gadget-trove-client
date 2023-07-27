import useCartItems from "../../hooks/useCartItems";

const Payments = () => {
  const { allCarts, refetch, isLoading } = useCartItems();
  return (
    <div className=" my-10 md:w-3/5 mx-auto border p-4 rounded">
      <div className="flex justify-between">
        <h3 className="text-lg text-gray-700 font-medium">PRODUCT</h3>
        <h3 className="text-lg text-gray-700 font-medium">TOTAL</h3>
      </div>
      <div className="border-b pb-3 border-gray-300  w-full"></div>
      <div className="gird grid-cols-1">
        {allCarts &&
          allCarts.length > 0 &&
          allCarts.map((item) => (
            <div
              key={item._id}
              className="group transition-all flex  border-b border-gray-300 py-4 w-full"
            >
              <div className="flex items-center justify-between gap-5 w-full">
                <div className="flex justify-start gap-4 items-center ">
                  {/* set loading for a specific item only */}
                  <div className="relative flex justify-center items-center">
                    <img className="w-14 " src={item.image} alt="" />
                  </div>
                  <h3 className=" font-medium text-gray-600 max-w-xs">
                    <span className="text-sm mr-5">{item?.name}</span> x{" "}
                    {item?.quantity}
                  </h3>
                </div>

                {/* price segment */}

                <div className="text-sky-500 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Payments;
