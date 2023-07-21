const EmptyCartItem = () => {
  return (
    <div className="text-center">
      <h3 className="text-3xl mb-2 text-gray-700 font-semibold">
        Your cart is currently empty.
      </h3>
      <p className="text-gray-500 text-sm">
        Before proceed to checkout you must add some products to your shopping
        cart. <br /> You will find a lot of interesting products on our Shop page.
      </p>
    </div>
  );
};

export default EmptyCartItem;
